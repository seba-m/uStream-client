import { useState } from 'react';
import { Spinner } from '../Spinner';

import UserService from '../../services/User.service';

import styles from './StreamSettings.module.scss';

export function StreamSettings({ user }) {

    const [key, setKey] = useState(user.key);
    const [showPassword, setShowPassword] = useState(false);
    const [showServer, setShowServer] = useState(false);
    const [isCopyPass , setIsCopyPass] = useState(false);
    const [isCopySv , setIsCopySv] = useState(false);
    const [textCopySv, setTextCopySv] = useState("Copy");
    const [textCopyPass, setTextCopyPass] = useState("Copy");

    const generateNewKey = () => {
        UserService.updateStreamKey(user.id).then(
            (response) => {
                setKey(response);
            });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleServer = () => {
        setShowServer(!showServer);
    };

    function copyTextPass() {
        var text = document.getElementById("input-text").value;
        navigator.clipboard.writeText(text);
        setIsCopyPass(true);
        setTextCopyPass("Copied");
    }

    function copyTextSv() {
        var text = document.getElementById("input-text-sv").value;
        navigator.clipboard.writeText(text);
        setIsCopySv(true);
        setTextCopySv("Copied");
    }

    return (


        <div className={styles.profileEditContainer}>
            <h2 className={styles.profileEditTittle}>Stream Settings</h2>
            <p className={styles.profileEditSubtittle}>Information about the transmission key</p>
            <div className={styles.profileEditBox}>
                <div className={styles.profileEditSubCaja}>
                    <div className={styles.contenedor}>
                        <div className={styles.editFieltTittle}>
                            <p>Stream Server</p>
                        </div>
                        <div className={styles.fieldsBox}>
                            <div className={styles.profileEditField}>
                                <input id="input-text-sv" readOnly className={styles.fieldInput} type={"text"} defaultValue={"rtmp://ustream.api.sebamorgado.com/app"} />
                                <div className={`${styles.profileEditSubBox} ${styles.profileEditButton}`}>
                                    {isCopySv? <button disabled className={styles.buttonSettings} onClick={copyTextSv}>{textCopySv}</button>
                                    : <button className={styles.buttonSettings} onClick={copyTextSv}>Copy</button>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.contenedor}>
                        <div className={styles.editFieltTittle}>
                            <p>Stream Key</p>
                        </div>
                        <div className={styles.fieldsBox}>
                            
                            <div className={styles.profileEditField}>
                                <input id="input-text" readOnly className={styles.fieldInput} type={showPassword ? "text" : "password"} defaultValue={key} />
                                <div className={`${styles.profileEditSubBox} ${styles.profileEditButton}`}>
                                    {isCopyPass? <button disabled className={styles.buttonSettings} onClick={copyTextPass}>{textCopyPass}</button>
                                    : <button className={styles.buttonSettings} onClick={copyTextPass}>Copy</button>}
                                    
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
        </div>
 
    )
}