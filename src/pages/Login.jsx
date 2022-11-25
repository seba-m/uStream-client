import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Spinner } from "../components/Spinner";

import styles from "./Login.module.scss";

import AuthService from "../services/Auth.service";

export function Login() {
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
    <div className={styles.loginContent}>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className={styles.inputsFields}>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <div className={styles.emailInput}>
                <span>Email</span>
                <Field type="email" name="email" />
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="email"
                  component="div"
                />
              </div>
              <div className={styles.passwordInput}>
                <span>Password</span>
                <Field type="password" name="password" />
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="password"
                  component="div"
                />
              </div>
              <p className={styles.forgotPassword}>
                <span>Forgot password?</span>
              </p>

              <button type="submit" disabled={isSubmitting}>
                <span>Login</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
