import { useEffect, useState } from 'react';
import styles from './OnlineStreamCard.module.scss';
import { Link } from "react-router-dom";
import UserService from '../../services/User.service'

export function OnlineStreamCard({ stream }) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                setAvatar(data);
            })
    }, [stream.username]);

    return (
        <li className={styles.streamCard}>
            <div className={styles.streamImage}>
                <Link to={`/stream/${stream.username}`}>
                    <figure className={styles.imageBorder}>
                        <img src={avatar} alt={stream.title} />
                    </figure>
                </Link>
            </div>

            <div className={styles.streamInfo}>
                <Link to={`/stream/${stream.username}`}>
                    <h1 className={styles.streamUsername}>{stream.username}</h1>
                </Link>
                <Link to={`/search/category?term=${stream.category}`} className={styles.tagUrl}>
                    <p className={styles.streamCategory}>{stream.category}</p>
                </Link>
                <p className={styles.streamViews}>{stream.views} spectators</p>
                <p className={styles.streamTitle}>{stream.title}</p>
                {stream.tags && stream.tags.length > 0 && (
                    <div className={styles.streamTags}>
                        {stream.tags.map((tag) =>
                            <div key={tag} className={styles.tag}>
                                <Link to={`/search/?term=${tag}&tag=true`} className={styles.tagUrl}>
                                    <span>{tag}</span>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </li>
    )
}
