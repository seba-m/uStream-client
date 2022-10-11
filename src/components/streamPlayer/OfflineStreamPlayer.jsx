import styles from './OfflineStreamPlayer.module.scss';
import { Link } from "react-router-dom";

import { getStreamImg } from '../../utils/getStreamImg';

export function OfflineStreamPlayer({ stream }) {

    const imgUrl = getStreamImg(stream.Username, 300);

    return (
        <div className={styles.streamRoot}>
            <div className={styles.streamVideo}>
                
            </div>

            <div className={styles.streamDetails}>
                <div className={styles.streamImage}>
                    <Link to={`/stream/${stream.Username}`}>
                        <figure className={styles.imageBorder}>
                            <img src={imgUrl} alt={stream.title} />
                        </figure>
                    </Link>
                </div>
                <div className={styles.streamInfo}>
                    <p className={styles.streamUsername}>{stream.Username}</p>
                    <p className={styles.streamTitle}>{stream.Title}</p>
                    <div>
                        <p className={`${styles.streamCategory}`}>{stream.Category}</p>
                        <div className={styles.streamTags}>
                            {stream.Tags.map((tag, index) =>
                                <div className={styles.tag} key={index}>
                                    <Link to={`/search/tag/${tag}`} className={styles.tagUrl}>
                                        <span>{tag}</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
