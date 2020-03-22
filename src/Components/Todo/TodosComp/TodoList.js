import React from 'react'
import { Row, Col, ListGroup, Button ,Spinner, Card } from 'react-bootstrap'
import PagComp from '../../pagination'


export default function TodoList({ todos = [], handleCheck, saveChanges ,showSpinner }) {
  let [active, setActive] = React.useState(1)
  let allData = todos;
  let calcDataLength = Math.round(allData.length / 5)
  let dataObj = {}
  let initStart = 0
  let range = 10
  for (let x = 1; x < calcDataLength; x++) {
    dataObj[x] = allData.slice(initStart, range)
    initStart += 10
    range += 10
  }
  const handleClick = x => {
    setActive(x)
  }
  return (
    <Row>
      <Col xs={12} md={{span:6, offset:2}}>
        <Card>
        <Card.Body>  
        <ListGroup as="ul" className="todolist mt-5">
          { !showSpinner ? dataObj[active] && dataObj[active].map((todo, idx) => {
              return (
                <ListGroup.Item key={todo.id}>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={evt => handleCheck(evt, todo)}
                    style={{ display: 'inline-block', margin: '15px 10px 0px' }}
                  />
                  {todo.title}
                </ListGroup.Item>
              )
            }) : <Spinner animation="border" role="status" style={{margin:"auto"}}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
                  }
        </ListGroup>
        </Card.Body>
        </Card>  
      </Col>

      {!showSpinner && <>
      <Col xs={12} md={{span:6, offset:2}} style={{ textAlign: 'center', marginTop:"20px" }}>
        <Button onClick={saveChanges} size="lg" color="info">
          Save
        </Button>
      </Col>
      <Col xs={12} md={{span:6, offset:2}}>
        <PagComp selectedPag={active} pagItems={5} onClick={handleClick} />
      </Col>
     </> 
      }
    </Row>
  )
}
