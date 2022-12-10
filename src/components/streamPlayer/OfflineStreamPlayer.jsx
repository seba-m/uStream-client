import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './OfflineStreamPlayer.module.scss';

import UserService from "../../services/User.service";
import GeneralService from '../../services/General.service';

export function OfflineStreamPlayer({ stream }) {
    const [avatar, setAvatar] = useState(null);
    const [banner, setBanner] = useState(null);

    const [isFollowing, setIsFollowing] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                setAvatar(data);
            })
    }, [stream.username]);

    useEffect(() => {
        UserService.getUserBanner(stream.username)
            .then(data => {
                setBanner(data);
            })
    }, [stream.username]);

    useEffect(() => {
        GeneralService.isFollowing(stream.username)
            .then(data => {
                setIsFollowing(data);
            })
            .catch(err => {
                setIsFollowing(null);
            })
    }, [stream.username]);

    const handleFollow = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className={styles.streamBanner}>
                <Link to={`/stream/${stream.username}`}>
                    <figure>
                        <img className={styles.streamFrontPageImage} src={banner} alt={stream.title} />
                    </figure>
                </Link>
            </div>
            <div className={styles.heroContainer}>
                <div className={styles.streamImage}>
                    <Link to={`/stream/${stream.username}`}>
                        <figure className={styles.imageBorder}>
                            <img src={avatar} alt={stream.title} />
                        </figure>
                    </Link>
                    <div className={styles.streamUsername}>
                        <h1 >{stream.username}</h1>
                        <h4 >Followers {stream.followers}</h4>
                    </div>
                </div>
                {isFollowing && (
                    <div className={styles.heroContainerRight}>
                        <button className={styles.followBox} onClick={handleFollow}>Follow</button>
                    </div>
                )}
            </div>
            <div>
                <h2 className={styles.streamAbout}>About {stream.username}</h2>
                <p className={styles.streamDescriptionAbout}>{stream.about}</p>
            </div>
        </div>
    )
}
