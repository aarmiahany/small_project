import React from "react";
import { Form, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import ModalComp from "../../Modal";
import axios from "axios";

export default function AddNewPost() {
  const [postData, setPostData] = React.useState();
  const [postId, incPostId] = React.useState(1);
  const [isOpen, toggle] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const handleChange = evt => {
    setPostData({
      ...postData,
      [evt.target.name]: evt.target.value,
      userId: 1,
      id: postId
    });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    incPostId(postId + 1);
    setShowSpinner(true);
    axios
      .post("/posts", postData)
      .then(res => {setShowSpinner(false); toggle(!isOpen)})
      .catch(ex => console.error(ex.message));
  };

  return (
    <Row>
      <ModalComp
        isOpen={isOpen}
        toggle={() => {
          toggle(!isOpen);
        }}
        body="Post Created Successfully"
        title="Done!"
      />


      <Col xs={12} md={{span:6, offset: 2}}>
      <Card style={{marginTop:"50px"}}>
        <Card.Body>  
          {
            !showSpinner ? 
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="post title..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              name="body"
              onChange={handleChange}
              type="text"
              placeholder="post Body..."
            />
          </Form.Group>
          <Form.Group style={{textAlign:"center"}}>
            <Button type="submit" color="success" size="lg">
              Add{" "}
            </Button>
          </Form.Group>
        </Form>
             : <div style={{textAlign:"center"}}>
             <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
              </Spinner> </div>
        }
       </Card.Body>
      </Card>  
      </Col>
    </Row>
  );
}
