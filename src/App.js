import React, { useEffect, useState } from "react";
import Todo from "./Components/Todo";
import Posts from "./Components/Posts";
import ModalComp from "./Components/Modal";
import AddNewPost from "./Components/Posts/PostsComp/AddNewPost";
import Home from './Components/Home';
import axios from "axios";
import config from "./config";

// load bootstrap fro styling
import "bootstrap/dist/css/bootstrap.min.css";
// config axios base url
axios.defaults.baseURL = config.ApiURL;

export default function App() {
  const [compToShow, setCompToShow] = React.useState("/");
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isOpen, toggle] = React.useState(false);
  const [newTodoChanges, setNewTodoChanges] = useState([]);
  let [showSpinner, setShowSpinner] = React.useState(false)

  useEffect(() => {
    axios
      .get("/posts")
      .then(res => setPosts(res.data))
      .catch(ex => console.error(ex));
  }, []);

  useEffect(() => {
    axios
      .get("/todos")
      .then(res => setTodos(res.data))
      .catch(ex => console.error(ex));
  }, []);

  let newTodos = [];
  let newTodo;
  const handleCheck = (evt, todos) => {
    newTodo = { ...todos, completed: !evt.target.checked };
    newTodos.push(newTodo);
    setNewTodoChanges([...newTodoChanges, newTodo]);
  };
  const saveChanges = () => {
    setShowSpinner(true)
    axios
      .post("/todos", newTodoChanges)
      .then(res => {setShowSpinner(false); toggle(!isOpen)} )
      .catch(ex => console.error(ex));
  };
  const navigate = url => {
    setCompToShow(url);
  }
  return (
    <div>
          <ModalComp
            isOpen={isOpen}
            toggle={() => {
              toggle(!isOpen);
            }}
            body="Changes Saaved Successfully"
            title="Done!"
          />
          <Home handleClick={navigate} />
          { compToShow === "/todos" && <Todo saveChanges={saveChanges} todos={todos} handleCheck={handleCheck} showSpinner={showSpinner}/>}
          { compToShow === "/posts" && <Posts posts={posts} createNewPost={() => navigate("/posts/addNew")}/>}
          { compToShow === "/posts/addNew" && <AddNewPost />}
    </div>
  );
}
