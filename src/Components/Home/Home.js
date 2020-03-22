import React from 'react';
import { Navbar ,Nav, Button } from 'react-bootstrap';

export default function Home({handleClick}){
    return(
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Button  onClick={() => handleClick("/todos")}>Todos</Button>
          <Button  onClick={() => handleClick("/posts")}>Posts</Button>
        </Nav>
      </Navbar>
    )
}