import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Spinner } from "../components/Spinner";

import AuthService from "../services/Auth.service";

import styles from "./Register.module.scss";

export function Register() {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [mail, setMail] = useState();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  
  function handleMailChange(e) {
    setMail(e.target.value);
  }

  function handlePassChange(e) {
    setPassword(e.target.value);
  }

  const handleLogin = (data, formikHelpers) => {
    formikHelpers.setSubmitting(true);

    setMessage("");

    AuthService.register(
      username,
      mail,
      password,
      data.birthDate
    )
      .then(
        () => {
          navigate("/login");
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
    <div className={styles.registerContent}>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
            birthDate: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!mail) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(mail)
            ) {
              errors.email = "Invalid email address";
            }

            if (!password) {
              errors.password = "Required";
            } else if (
              password.length < 6 ||
              password.length > 40
            ) {
              errors.password = "Password must be between 6 and 40 characters";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(
                password
              )
            ) {
              errors.password =
                "Password must contain at least one uppercase letter, one lowercase letter, and one number";
            }

            if (!username) {
              errors.username = "Required";
            } else if (
              username.length < 3 ||
              username.length > 20
            ) {
              errors.username = "Username must be between 3 and 20 characters";
            } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
              errors.username =
                "Username must contain only letters and numbers";
            }

            if (!values.birthDate) {
              errors.birthDate = "Required";
            } else {
              const today = new Date();
              const birthDate = new Date(values.birthDate);
              let age = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              if (age < 13) {
                errors.birthDate =
                  "You must be at least 13 years old to register";
              } else if (age > 120) {
                errors.birthDate =
                  "You must be less than 120 years old to register";
              }
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
              <div className={`${styles.containerInput} ${styles.formGroup}`}>
                
                <Field className={styles.formInput} value={username} type="text" name="username" onChange={handleUsernameChange} />
                <span className={`${styles.formLabel} ${username && styles.filled}`}>Username</span>
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="username"
                  component="div"
                />
              </div>

              <div className={`${styles.containerInput} ${styles.formGroup}`}>
                
                <Field className={styles.formInput} value={password} type="password" name="password" onChange={handlePassChange} />
                <span className={`${styles.formLabel} ${password && styles.filled}`}>Password</span>
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="password"
                  component="div"
                />
              </div>
              <div className={styles.containerInput}>
                <span className={styles.dateBirth}>Date of Birth</span>
                <Field className={styles.formInput} type="date" name="birthDate" />
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="birthDate"
                  component="div"
                />
              </div>

              <div className={`${styles.finalInput} ${styles.formGroup}`}>
                
                <Field className={styles.formInput} value={mail} type="email" name="email" onChange={handleMailChange}/>
                <span className={`${styles.formLabel} ${mail && styles.filled}`}>Email</span>
                <div className={styles.underline}></div>
                <ErrorMessage
                  className={styles.errorText}
                  name="email"
                  component="div"
                />
              </div>

              <p className={styles.termsAndConditions}>
                By clicking Sign Up, you are indicating that you have read and acknowledge the <a href="https://www.google.cl" target="_blank">Terms of Service</a> and <a a href="https://www.uStream.tk" target="_blank">Privacy Policy.</a>
              </p>

              <button type="submit" disabled={isSubmitting}>
                <span>SignUp</span>
              </button>
            </Form>

            /*<Form>
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}

                            <Field type="text" name="username" />
                            <ErrorMessage name="username" component="div" />

                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />

                            <Field type="date" name="birthDate" />
                            <ErrorMessage name="birthDate" component="div" />

                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                            
                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting}>
                                    <span>SignUp</span>
                                </button>
                            </div>
                                    </Form>*/
          )}
        </Formik>
      </div>
    </div>
  );
}
