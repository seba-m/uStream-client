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
        <>
            <div>
                <h1>Profile</h1>
                <div>
                    <h2>Preview</h2>
                    <div>
                        <div>
                            <img src={user.avatar} alt="avatar" />
                        </div>
                        <div>
                            <p>About {user.userName}</p>
                            <p>{user.followers} followers</p>
                            {user.about && user.about.trim() !== "" ? // if user.about is not empty
                                <p>{user.about}</p> 
                                    : 
                                <p>Hello world!, im {user.userName}.</p>
                            }
                        </div>
                    </div>

                </div>

                <div>
                    <h2>Profile Settings</h2>
                    <div>
                        <p>Username:</p>
                        <input type="text" value={user.userName} />
                    </div>
                    <div>
                        <p>Public username:</p>
                        <input type="text" value={user.streamData.name} />
                    </div>
                    <div>
                        <p>About Me:</p>
                        <textarea value={user.about} />
                    </div>
                    
                    <button>
                        Save Changes
                    </button>
                </div>
                <div>
                    <h2>Contact</h2>
                    <div>
                        <h3>Email:</h3>
                        <input type="text" value={user.email} />
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <p>Current Password</p>
                        <input type="password" placeholder="*******" />

                        <p>New Password</p>
                        <input type="password" placeholder="*******" />
                    </div>
                    <button>
                        Save Changes
                    </button>
                </div>
                <div>
                    <h2>Profile Image</h2>
                    <img src={user.profileImage} alt="profile" />
                </div>
                <div>
                    <h2>Profile Banner</h2>
                    <img src={user.profileBanner} alt="banner" />
                </div>
                <h1>Stream Settings</h1>
                <div>
                    <p>Stream Key</p>
                    <div>
                        <input type="password" value={user.key} />
                    </div>
                </div>
                <div>
                    <button>
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    )
}
