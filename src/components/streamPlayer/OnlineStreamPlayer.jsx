import styles from './OnlineStreamPlayer.module.scss';
import { Link } from "react-router-dom";
import { VideoPlayer } from '../VideoPlayer';
import UserService from "../../services/User.service";
import { useEffect, useState } from 'react';

import { getImg } from '../../utils/httpClient';

export function OnlineStreamPlayer({ stream }) {

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                setAvatar(data);
            })
    }, [stream.username]);

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
                <div className={styles.heroContainerRight}>
                    <div className={styles.followBox}>
                        <h2 className={styles.buttonText}>Follow</h2>
                    </div>
                </div>

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
