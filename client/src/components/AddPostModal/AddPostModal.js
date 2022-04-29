import {useMutation} from "@apollo/client";
import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {CREATE_POST} from "../../core/queries";

export default function AddPostModal() {
  const [show, setShow] = useState(false);

  const [createPost, {data, loading}] = useMutation(CREATE_POST);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleClick = () => {
    if (!content || !title) return;

    createPost({
      variables: {
        content,
        title,
      },
    });
    handleClose();
  };

  useEffect(() => {
    if (data) {
      if (data.createPost.userErrors.lenght > 0) {
        setError(data.createPost.userErrors[0].message);
      } else if (data.createPost.post) {
      }
    }
  }, [data]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
