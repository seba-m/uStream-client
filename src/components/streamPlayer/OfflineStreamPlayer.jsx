import styles from './OfflineStreamPlayer.module.scss';
import { Link } from "react-router-dom";
import UserService from "../../services/User.service";

import { getImg } from '../../utils/httpClient';
import { useEffect, useState } from 'react';

export function OfflineStreamPlayer({ stream }) {
    const [tipo, setTipo] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [banner, setBanner] = useState(null);

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



    return (
        <div className={styles.streamRoot}>
            <div className={styles.streamFrontPageImage}>
                <Link to={`/stream/${stream.username}`}>
                    <figure className={styles.imageBorderFrontPage}>
                        <img src={banner} alt={stream.title} />
                    </figure>
                </Link>
            </div>
            <div className={styles.heroContainer}>
                <div className={styles.streamDetails}>
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
                    <div>
                        <h2 className={styles.streamAbout}>About {stream.username}</h2>
                        <p className={styles.streamDescriptionAbout}>{stream.about}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
