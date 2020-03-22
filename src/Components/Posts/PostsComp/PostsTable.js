import React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import PagComp from "../../pagination";
// import { useHistory } from "react-router-dom";

export default function PostsTable({ posts = [], createNewPost }) {
  // let history = useHistory();
  let [active, setActive] = React.useState(1);
  let allData = posts;
  let calcDataLength = Math.round(allData.length / 5);
  let dataObj = {};
  let initStart = 0;
  let range = 10;
  for (let x = 1; x < calcDataLength; x++) {
    dataObj[x] = allData.slice(initStart, range);
    initStart += 10;
    range += 10;
  }
  const handleClick = x => {
    setActive(x);
  };

  return (
    <Row>
      <Col xs={12} md={{span:8, offset:2}}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>body</th>
              <th>
                <Button size="sm" onClick={createNewPost}>
                  Create new
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataObj[active] &&
              dataObj[active].map((post, idx) => {
                return (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Col>
      <Col xs={12} md={{span:8, offset:2}}>
        <PagComp selectedPag={active} pagItems={5} onClick={handleClick} />
      </Col>
    </Row>
  );
}
