import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Spinner } from '../Spinner';

import UserService from '../../services/User.service';
import styles from './ContactProfile.module.scss';

export function ContactProfile({ user }) {

    const [message, setMessage] = useState("");
    const [changePassword, setChangePassword] = useState("");
    const [changeNewPass, setChangeNewPass] = useState("");

    function censorEmail(email) {
        const censoredEmail = email.replace(/([^@]{1})([^@]*)(@)([^@.]*)(.*)/, "$1****$3****$5");
        return censoredEmail;
    }

    const handlePassword = (e) => {
        setChangePassword(e.target.value);
    }
    
    const handleNewPassword = (e) => {
        setChangeNewPass(e.target.value);
    }

    const handleContact = (data, formikHelpers) => {

        data.password = changePassword;
        data.newPassword = changeNewPass;

        //console.log(data);

        formikHelpers.setSubmitting(true);

        setMessage("");

        UserService.updateContactSettings(data.password, data.newPassword)
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
                onSubmit={handleContact}
                validate={values => {

                    const errors = {};

                    if (!changePassword) {
                        errors.password = 'Required';
                    } else if (changePassword && changePassword.length < 6) {
                        errors.password = 'Must be 6 characters or more';
                    } else if (changePassword && changePassword.length > 40) {
                        errors.password = 'Must be 40 characters or less';
                    }

                    if (!changeNewPass) {
                        errors.newPassword = 'Required';
                    } else if (changeNewPass && changeNewPass.length < 6) {
                        errors.newPassword = 'Must be 6 characters or more';
                    } else if (changeNewPass && changeNewPass.length > 40) {
                        errors.newPassword = 'Must be 40 characters or less';
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
                        <div className={styles.profileEditContainer}>
                            <h2 className={styles.profileEditTittle}>Contact Settings</h2>
                            <p className={styles.profileEditSubtittle}>You can update your credentials to maintain the security of your account.</p>
                            <div className={styles.profileEditBox}>
                                <div className={styles.profileEditSubBox}>
                                    <div className={styles.editFieltTittle}>
                                        <p>Email</p>
                                    </div>
                                    <div className={styles.profileEditField}>
                                        <h2 className={styles.emailField}>{censorEmail(user.email)}</h2>
                                        <span className={styles.helpField}>This email is linked to your account.</span>
                                        <ErrorMessage className={styles.errorField} name="email" component="div" />
                                    </div>
                                </div>
                                <div className={styles.profileEditSubBox}>
                                    <div className={styles.editFieltTittle}>
                                        <p>Password</p>
                                    </div>
                                    <div className={styles.profileEditField}>
                                        <Field className={styles.fieldInput} value={changePassword} type="password" name="password" onChange={handlePassword}/>
                                        <ErrorMessage className={styles.errorField} name="password" component="div" />
                                    </div>
                                </div>
                                <div className={styles.profileEditSubBox}>
                                    <div className={styles.editFieltTittle}>
                                        <p>New Password</p>
                                    </div>
                                    <div className={styles.profileEditField}>
                                        <Field className={styles.fieldInput} value={changeNewPass}  type="password" name="newPassword" onChange={handleNewPassword}/>
                                        <ErrorMessage className={styles.errorField} name="newPassword" component="div" />
                                    </div>
                                </div>

                                <div className={`${styles.profileEditSubBox} ${styles.profileEditButton}`}>
                                    {changeNewPass.length > 0? 
                                    <button type="submit">
                                        <span>Save Changes</span>
                                    </button>
                                     : 
                                    <button type="submit" disabled>
                                        <span>Save Changes</span>
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}