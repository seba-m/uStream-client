
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Spinner } from '../components/Spinner';

import AuthService from "../services/AuthService";

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
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        ).finally(() => {
            formikHelpers.setSubmitting(false);
        });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
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
                                    {isSubmitting && (
                                        <Spinner />
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

}

export default Login;