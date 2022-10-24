import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Spinner } from '../Spinner';

import UserService from '../../services/User.service';

export function ProfileSettings({ user }) {

    const [message, setMessage] = useState("");

    const handleProfile = (data, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        setMessage("");

        UserService.updateProfileSettings(data.email, data.password)
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
        <div>
            <Formik
                initialValues={{ name: user.userName, publicName: user.streamData.name, about: user.about }}
                onSubmit={handleProfile}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    } else if (!/^[a-zA-Z0-9]+$/.test(values.name)) {
                        errors.name = 'Invalid Name';
                    }

                    if (!values.publicName) {
                        errors.publicName = 'Required';
                    } else if (!/^[a-zA-Z0-9]+$/.test(values.publicName)) {
                        errors.publicName = 'Invalid Name';
                    }

                    if (values.about && values.about.length > 200) {
                        errors.about = 'Must be 200 characters or less';
                    }

                    return errors;
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <h2>Preview</h2>
                        <div>
                            <p>About {values.publicName}</p>
                            <p>{user.followers} followers</p>
                            {values.about && values.about.trim() !== "" ? // if user.about is not empty
                                <p>{values.about}</p>
                                :
                                <p>Hello world!, im {values.publicName}.</p>
                            }
                        </div>

                        <h2>Profile Settings</h2>
                        <div>
                            <p>Username:</p>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <p>Public username:</p>
                            <Field type="text" name="publicName" />
                            <ErrorMessage name="publicName" component="div" />
                        </div>
                        <div>
                            <p>About Me:</p>
                            <Field name="about" as="textarea" />
                            <ErrorMessage name="about" component="div" />
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
        </div>
    )
}