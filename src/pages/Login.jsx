import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik";

import { Spinner } from "../components/Spinner";

import styles from "./Login.module.scss";

import AuthService from "../services/Auth.service";

export function Login( {showForgot} ) {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  function handleMailChange(e) {
    setMail(e.target.value);
  }

  function handlePassChange(e) {
    setPassword(e.target.value);
  }

  const handleShowForgotPass = (e) => {
    showForgot(true);
  }

  const handleLogin = (data, formikHelpers) => {
    formikHelpers.setSubmitting(true);

    setMessage("");

    AuthService.login(mail, password)
      .then(
        () => {
          navigate("/");
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
            console.log("otro mail " + mail);
            if (!mail) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(mail)) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={handleLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className={styles.inputsFields}>
              {/*<FormObserver />*/}
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <div className={`${styles.emailInput} ${styles.formGroup}`}>
                <Field className={styles.formInput} value={mail} type="email" name="email" onChange={ handleMailChange}/>
                <span
                  className={`${styles.formLabel} ${mail && styles.filled}`}
                >
                  Email
                </span>
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="email"
                  component="div"
                />
              </div>
              <div className={`${styles.passwordInput} ${styles.formGroup}`}>
                <Field
                  className={styles.formInput}
                  value={password}
                  type="password"
                  name="password"
                  onChange={handlePassChange}
                />
                <span
                  className={`${styles.formLabel} ${password && styles.filled}`}
                >
                  Password
                </span>

                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="password"
                  component="div"
                />
              </div>
              <p className={styles.forgotPassword}>
                <a role="button" onClick={handleShowForgotPass}>Forgot password?</a>
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
