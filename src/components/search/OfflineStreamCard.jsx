import styles from './OfflineStreamCard.module.scss';
import { Link } from "react-router-dom";
import { getStreamImg } from '../../utils/getStreamImg';

export function OfflineStreamCard({ stream }) {
    const imgUrl = getStreamImg(stream.poster_path, 300);
    return (
        <li className={styles.streamCard}>
            <div className={styles.streamImage}>
                <Link to={`/stream/${stream.username}`}>
                    <figure className={styles.imageBorder}>
                        <img src={imgUrl} alt={stream.title} />
                    </figure>
                </Link>
            </div>

            <div className={styles.streamInfo}>
                <Link to={`/stream/${stream.username}`}>
                    <h1 className={styles.streamUsername}>{stream.username}</h1>
                </Link>
                <p>{stream.followers} followers</p>
                <p className={styles.streamAbout}>{stream.about}</p>
            </div>

            
        </li>
        
    )
}
