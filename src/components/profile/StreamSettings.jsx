import { useState } from 'react';
import { Spinner } from '../Spinner';

import UserService from '../../services/User.service';

import styles from './StreamSettings.module.scss';

export function StreamSettings({ user }) {

    const [key, setKey] = useState(user.key);
    const [showPassword, setShowPassword] = useState(false);
    const [isCopy , setIsCopy] = useState(false);
    const [textCopy, setTextCopy] = useState("Copy");

    const generateNewKey = () => {
        UserService.updateStreamKey(user.id).then(
            (response) => {
                setKey(response);
            });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    function copyText() {
        var text = document.getElementById("input-text").value;
        navigator.clipboard.writeText(text);
        setIsCopy(true);
        setTextCopy("Copied");
    }

    return (


        <div className={styles.profileEditContainer}>
            <h2 className={styles.profileEditTittle}>Stream Settings</h2>
            <p className={styles.profileEditSubtittle}>Information about the transmission key</p>
            <div className={styles.profileEditBox}>
                <div className={styles.profileEditSubCaja}>
                    <div className={styles.editFieltTittle}>
                        <p>Stream Key</p>
                    </div>
                    <div className={styles.fieldsBox}>
                        <div className={styles.profileEditField}>
                            <input id="input-text" readOnly className={styles.fieldInput} type={showPassword ? "text" : "password"} defaultValue={key} />
                            <div className={`${styles.profileEditSubBox} ${styles.profileEditButton}`}>
                                {isCopy? <button disabled className={styles.buttonSettings} onClick={copyText}>{textCopy}</button>
                                : <button className={styles.buttonSettings} onClick={copyText}>Copy</button>}
                                
                                <button className={`${styles.buttonSettings} ${styles.buttonNewKey}`} onClick={generateNewKey}>Generate New Key</button>
                            </div>
                        </div>
                        <div className={styles.settingButton}>
                            <button className={`${styles.buttonSettings} ${styles.buttonShow}`} onClick={togglePassword}>Show Key</button>
                        </div>

                    </div>

                    
                </div>  
            </div>
        </div>
 
    )
}