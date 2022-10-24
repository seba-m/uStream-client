import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Spinner } from '../Spinner';

import UserService from '../../services/User.service';

export function ContactProfile({ user }) {

    const [message, setMessage] = useState("");

    const handleContact = (data, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        setMessage("");

        UserService.updateContactSettings(data.email, data.password)
            .then(
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
        <>
            <Formik
                initialValues={{ email: user.email, password: "", newPassword: "" }}
                onsubmit={handleContact}
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
                    } else if (values.password && values.password.length < 6) {
                        errors.password = 'Must be 6 characters or more';
                    } else if (values.password && values.password.length > 40) {
                        errors.password = 'Must be 40 characters or less';
                    }

                    if (!values.newPassword) {
                        errors.newPassword = 'Required';
                    } else if (values.newPassword && values.newPassword.length < 6) {
                        errors.password = 'Must be 6 characters or more';
                    } else if (values.newPassword && values.newPassword.length > 40) {
                        errors.password = 'Must be 40 characters or less';
                    }

                    return errors;
                }}
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

                        <h2>Contact Settings</h2>
                        <div>
                            <p>Email:</p>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <p>Password:</p>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div>
                            <p>New Password:</p>
                            <Field type="password" name="newPassword" />
                            <ErrorMessage name="newPassword" component="div" />
                        </div>

                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Spinner />
                                )}
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}