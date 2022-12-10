import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./ForgotPassword.module.scss";

import AuthService from "../services/Auth.service";

export function ForgotPassword({ showForgot }) {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [mail, setMail] = useState();
  
  function handleMailChange(e) {
    setMail(e.target.value);
  }

  const handleShowForgotPass = (e) => {
    showForgot(false);
  };

  const handleEmailForgot = (data, formikHelpers) => {
    formikHelpers.setSubmitting(true);

    setMessage("");

    AuthService.recovery(mail)
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
    <div className={styles.forgotContent}>
      <div>
        <button className={styles.closeForgot} onClick={handleShowForgotPass}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.dropdownOptionIcon} />
        </button>
        <h2 className={styles.tittleWindow}>Account Recovery</h2>
        <p className={styles.textInformation}>Tell us some information about your account.</p>
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            const errors = {};
            if (!mail) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(mail)) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={handleEmailForgot}
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
                <Field
                  className={styles.formInput}
                  value={mail}
                  type="email"
                  name="email"
                  onChange={handleMailChange}
                />
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

              <button type="submit">
                <span>Sent me a code</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
