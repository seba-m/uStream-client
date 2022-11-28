import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/Auth.service"
import UserService from '../services/User.service';
import { Spinner } from '../components/Spinner';

import { ProfileSettings } from '../components/profile/ProfileSettings';
import { ContactProfile } from '../components/profile/ContactProfile';
import { StreamSettings } from '../components/profile/StreamSettings';
import { ImageSettings } from '../components/profile/ImageSettings';
import { DeleteAccount } from '../components/profile/DeleteAccount';
import { ChannelColorIdentity } from '../components/profile/ChannelColorIdentity';

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
        <>
            <div>
                <h1>Profile</h1>
                
                <div>
                    <ProfileSettings user={user} />
                </div>
                <div>
                    <ContactProfile user={user} />
                </div>
                <div>
                    <ImageSettings user={user} />
                </div>
                <div>
                    <ChannelColorIdentity user={user} />
                </div>
                <div>
                    <StreamSettings user={user} />
                </div>
                <div>
                    <DeleteAccount user={user} />
                </div>
            </div>
        </>
    )
}
