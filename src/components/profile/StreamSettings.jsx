import { useState } from 'react';
import { Spinner } from '../Spinner';

import UserService from '../../services/User.service';

export function StreamSettings({ user }) {

    const [key, setKey] = useState(user.key);
    const [showPassword, setShowPassword] = useState(false);

    const generateNewKey = () => {
        UserService.updateStreamKey(user.id).then(
            (response) => {
                setKey(response);
            });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <h2>Stream Settings</h2>
            <div>
                <p>Stream Key</p>
                <div>
                    <input type={showPassword ? "text" : "password"} defaultValue={key} />
                    <div>
                        <button onClick={togglePassword}>Show Key</button>
                        <button onClick={generateNewKey}>Generate New Key</button>
                    </div>
                </div>
            </div>
        </>
    )
}