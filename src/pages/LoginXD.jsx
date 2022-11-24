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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={styles.loginContainer}>
          <div className={styles.logoModal}>
            <div className={styles.logo}>
              <svg
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clippath="url(#clip0_2_80)">
                  <path
                    d="M0.575317 28H10.0685C14.57 28 18.2192 24.3508 18.2192 19.8493H8.726C4.2245 19.8493 0.575317 23.4985 0.575317 28Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                  <path
                    d="M0.575317 8.63012V20.6164C5.07682 20.6164 8.726 16.9672 8.726 12.4657V0.479431C4.2245 0.479431 0.575317 4.12862 0.575317 8.63012Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                  <path
                    d="M27.4247 0H17.9315C13.43 0 9.78082 3.64919 9.78082 8.15068H19.274C23.7755 8.15068 27.4247 4.5015 27.4247 0Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                  <path
                    d="M27.4247 19.3698V7.38354C22.9232 7.38354 19.274 11.0327 19.274 15.5342V27.5205C23.7755 27.5205 27.4247 23.8713 27.4247 19.3698Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_80">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className={styles.textNav}>uStream</h1>
          </div>
          <div className={styles.loginContent}>
            <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />

              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}

                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                    <div className="form-group">
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Spinner />}
                        <span>Login</span>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
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
