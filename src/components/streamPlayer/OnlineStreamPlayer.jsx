import styles from './OnlineStreamPlayer.module.scss';
import { Link } from "react-router-dom";
import { VideoPlayer } from '../VideoPlayer';

import { getStreamImg } from '../../utils/getStreamImg';

export function OnlineStreamPlayer({ stream }) {

    const imgUrl = getStreamImg(stream.username, 300);

    return (
        <div className={styles.streamRoot}>
            <div className={styles.streamVideo}>
                <VideoPlayer streamUrl={stream.url} />
            </div>

            <div className={styles.streamDetails}>
                <div className={styles.streamImage}>
                    <Link to={`/stream/${stream.username}`}>
                        <figure className={styles.imageBorder}>
                            <img src={imgUrl} alt={stream.title} />
                        </figure>
                    </Link>
                </div>
                <div className={styles.streamInfo}>
                    <p className={styles.streamUsername}>{stream.username}</p>
                    <p className={styles.streamTitle}>{stream.title}</p>
                    <div>
                        <p className={`${styles.streamCategory}`}>{stream.category}</p>
                        {stream.tags.length > 0 && (
                            <div className={styles.streamTags}>
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
    )
}
