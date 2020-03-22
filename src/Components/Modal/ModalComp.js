import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalComp({ isOpen, title, body, toggle }) {
  return (
    <Modal show={isOpen}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={toggle} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
