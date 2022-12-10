import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Spinner } from '../Spinner';

import styles from './ProfileSettings.module.scss';

import UserService from '../../services/User.service';

export function ProfileSettings({ user }) {

    const [message, setMessage] = useState("");

    const [changePublicName, setChangePublicName] = useState(user.streamData.name);

    const [changeAbout, setChangeAbout] = useState(user.about);

    const handlePublicName = (e) => {
        setChangePublicName(e.target.value);
    }
    
    const handleAbout = (e) => {
        setChangeAbout(e.target.value);
    }

    const handleProfile = (data, formikHelpers) => {


        formikHelpers.setSubmitting(true);

        setMessage("");
        console.log(data.publicName)
        UserService.updateProfileSettings(changePublicName, changeAbout)
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
                initialValues={{ name:user.userName, publicName: user.streamData.name, about: user.about }}
                onSubmit={handleProfile}
                validate={values => {
                    const errors = {};

                    if (!values.publicName) {
                        errors.publicName = 'Required';
                    } else if (!/^[a-zA-Z0-9]+$/.test(changePublicName)) {
                        errors.publicName = 'Invalid Name';
                    } else if (user.userName.toLowerCase() !== changePublicName.toLowerCase()) {
                        errors.publicName = 'You cannot change your public name, only the use of capital letters.';
                    }

                    if (changeAbout && changeAbout.length > 300) {
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

                        <div className={styles.profileEditContainer}>
                            <div className={styles.aboutSection}>
                                <h2 className={styles.aboutTittle}>About {values.publicName}</h2>
                                <p><span className={styles.followers}>{user.followers}</span><span className={styles.text}> followers</span></p>
                                <div className={styles.aboutBox}>
                                    {values.about && values.about.trim() !== "" ? // if user.about is not empty
                                        <span className={styles.textAbout}>{changeAbout}</span>
                                        :
                                        <span className={styles.textAbout}>Hello world!, im {values.publicName}.</span>
                                    }
                                </div>
                            </div>

                            <h2 className={styles.profileEditTittle}>Profile Settings</h2>
                            <p className={styles.profileEditSubtittle}>Change your account identification data</p>
                            <div className={styles.profileEditBox}>
                                <div className={styles.profileEditSubBox}>
                                    <div className={styles.editFieltTittle}>
                                        <p>Username</p>
                                    </div>
                                    <div className={styles.profileEditField}>
                                        <Field className={`${styles.fieldInput} ${styles.disabledField}`} type="text" name="name" disabled/>
                                    </div>
                                </div>
                                <div className={styles.profileEditSubBox}>
                                    <div className={styles.editFieltTittle}>
                                        <p>Public username</p>
                                    </div>
                                    <div className={styles.profileEditField}>
                                        <Field className={styles.fieldInput} value={changePublicName} type="text" name="publicName" onChange={handlePublicName}/>
                                        <span className={styles.helpField}>Customize the use of capital letters in your user name.</span>
                                        <ErrorMessage className={styles.errorField} name="publicName" component="div" />
                                    </div>
                                </div>
                                <div className={styles.profileEditSubBox}>
                                    <div className={styles.editFieltTittle}>
                                        <p>About Me</p> 
                                    </div>
                                    <div className={styles.profileEditField}>
                                        <Field className={`${styles.fieldInput} ${styles.textAreaResize}`} value={changeAbout} name="about" as="textarea" maxlength="300" onChange={handleAbout} />
                                        <span className={styles.helpField}>The description in the "About" panel of your channel must be less than 300 characters.</span>
                                        <ErrorMessage className={styles.errorField} name="about" component="div" /> 
                                    </div>
                                </div>

                                <div className={`${styles.profileEditSubBox} ${styles.profileEditButton}`}>
                                    {changeAbout !== user.about || changePublicName !== user.streamData.name? 
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
        </div>
    )
}