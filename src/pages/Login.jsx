import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Spinner } from "../components/Spinner";

import styles from "./Login.module.scss";

import AuthService from "../services/Auth.service";

export function Login(/*{ show, handleClose }*/ props) {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleLogin = (data, formikHelpers) => {
    formikHelpers.setSubmitting(true);

    setMessage("");

    AuthService.login(data.email, data.password)
      .then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      )
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  return (
    <>
      <Modal
        {...props}
        dialogClassName={styles.modalContainer}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={styles.loginContainer}>
          <div className={styles.logoModal}>
            LOGO
          </div>
          <div className={styles.loginContent}>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </div>
        </div>
      </Modal>

      {/*<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 style={{ color: "#000" }}>Login</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>*/}
    </>
  );
}

export default Login;
