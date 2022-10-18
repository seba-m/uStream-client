
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Spinner } from '../components/Spinner';

import AuthService from "../services/AuthService";

export function Register() {
    let navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleLogin = (data, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        setMessage("");

        AuthService.register(data.username, data.email, data.password, data.birthDate)
            .then(
                () => {
                    navigate("/login");
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
                    initialValues={{ email: '', password: '', username: '', birthDate: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 6 || values.password.length > 40) {
                            errors.password = 'Password must be between 6 and 40 characters';
                        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(values.password)) {
                            errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
                        }

                        if (!values.username) {
                            errors.username = 'Required';
                        } else if (values.username.length < 3 || values.username.length > 20) {
                            errors.username = 'Username must be between 3 and 20 characters';
                        } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
                            errors.username = 'Username must contain only letters and numbers';
                        }

                        if (!values.birthDate) {
                            errors.birthDate = 'Required';
                        } else {
                            const today = new Date();
                            const birthDate = new Date(values.birthDate);
                            let age = today.getFullYear() - birthDate.getFullYear();
                            const m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            if (age < 13) {
                                errors.birthDate = 'You must be at least 13 years old to register';
                            } else if (age > 120) {
                                errors.birthDate = 'You must be less than 120 years old to register';
                            }
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
                                    {isSubmitting && (
                                        <Spinner />
                                    )}
                                    <span>SignUp</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
