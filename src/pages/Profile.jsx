import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/Auth.service"
import UserService from '../services/User.service';

import { Spinner } from '../components/Spinner';

export function Profile() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const user = AuthService.getCurrentUser();
        if (user) {
            UserService.getProfile(user.id)
                .then(data => {
                    setUser(data);
                    setIsLoading(false);
                })
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (isLoading) {
        return <Spinner />
    }

    if (!user) return null;

    return (
        <div>profile page</div>
    )
}
