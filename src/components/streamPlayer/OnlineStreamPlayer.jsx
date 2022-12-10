import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './OnlineStreamPlayer.module.scss';
import { VideoPlayer } from '../VideoPlayer';

import UserService from "../../services/User.service";
import GeneralService from '../../services/General.service';

export function OnlineStreamPlayer({ stream }) {

    const [avatar, setAvatar] = useState(null);
    const [isFollowing, setIsFollowing] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                setAvatar(data);
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
        <div className={styles.streamRoot}>
            <div className={styles.streamVideo}>
                <VideoPlayer streamUrl={stream.url} />
            </div>
            <div className={styles.heroContainer}>
                <div className={styles.heroContainerLeft}>
                    <div className={styles.streamDetails}>
                        <div className={styles.streamImage}>
                            <Link to={`/stream/${stream.username}`}>
                                <figure className={styles.imageBorder}>
                                    <img src={avatar} alt={stream.title} />
                                </figure>
                            </Link>
                            <div className={styles.streamInfo}>
                                <h1 className={styles.streamUsername}>{stream.username}</h1>
                                <h3 className={styles.streamTitle}>{stream.title}</h3>
                                <div>
                                    <p className={`${styles.streamCategory}`}>{stream.category}</p>
                                    {stream.tags.length > 0 && (
                                        <div className={styles.tagsContainer}>
                                            {stream.tags.map((tag, index) =>
                                                <div className={styles.tag} key={index}>
                                                    <Link to={`/search/tag/${tag}`} className={styles.tagUrl}>
                                                        <span>{tag}</span>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {isFollowing && (
                    <div className={styles.heroContainerRight}>
                        <button className={styles.followBox} onClick={handleFollow}>Follow</button>
                    </div>
                )}

            </div>
            <div>
                <div>
                    <h2 className={styles.streamAbout}>About {stream.username}</h2>
                    <p className={styles.streamDescriptionAbout}>{stream.about}</p>
                </div>
            </div>
        </div>
    )
}
