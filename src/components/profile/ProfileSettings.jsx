import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Spinner } from '../Spinner';

import styles from './ProfileSettings.module.scss';

import UserService from '../../services/User.service';

export function ProfileSettings({ user }) {

    const [message, setMessage] = useState("");

    const handleProfile = (data, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        setMessage("");

        UserService.updateProfileSettings(data.publicName, data.about)
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
                initialValues={{ publicName: user.streamData.name, about: user.about }}
                onSubmit={handleProfile}
                validate={values => {
                    const errors = {};

                    if (!values.publicName) {
                        errors.publicName = 'Required';
                    } else if (!/^[a-zA-Z0-9]+$/.test(values.publicName)) {
                        errors.publicName = 'Invalid Name';
                    } else if (user.userName.toLowerCase() !== values.publicName.toLowerCase()) {
                        errors.publicName = 'You cannot change your public name, only the use of capital letters.';
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

                        
                        <div className={styles.aboutSection}>
                            <h2 className={styles.aboutTittle}>About {values.publicName}</h2>
                            <p><span className={styles.followers}>{user.followers}</span><span className={styles.text}> followers</span></p>
                            <div className={styles.aboutBox}>
                                {values.about && values.about.trim() !== "" ? // if user.about is not empty
                                    <span className={styles.textAbout}>{values.about}</span>
                                    :
                                    <span className={styles.textAbout}>Hello world!, im {values.publicName}.</span>
                                }
                            </div>
                        </div>

                        <h2 className={styles.profileEditTittle}>Profile Settings</h2>
                        <span className={styles.profileEditSubtittle}>Change your account identification data</span>
                        <div className={styles.profileEditBox}>
                            <div>
                                <p>Username:</p>
                                <Field type="text" name="name" disabled/>
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div>
                                <p>Public username:</p>
                                <Field type="text" name="publicName" />
                                <ErrorMessage name="publicName" component="div" />
                            </div>
                            <div>
                                <p>About Me:</p>
                                <Field name="about" as="textarea"  />
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
                        </div>
                        
                    </Form>
                )}
            </Formik>
        </div>
    )
}