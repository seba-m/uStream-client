import styles from './OfflineStreamCard.module.scss';
import { Link } from "react-router-dom";
import { getStreamImg } from '../utils/getStreamImg';

export function OfflineStreamCard({ stream }) {
    const imgUrl = getStreamImg(stream.poster_path, 300);
    return (
        <li className={styles.streamCard}>
            <div className={styles.streamImage}>
                <Link to={`/stream/${stream.Username}`}>
                    <img
                        src={imgUrl}
                        alt={stream.title}
                    />
                </Link>
            </div>

            <div className={styles.streamInfo}>
                <Link to={`/stream/${stream.Username}`}>
                    <h1 className={styles.streamUsername}>{stream.Username}</h1>
                </Link>
                <p>{stream.Followers} followers</p>
                <p className={styles.streamAbout}>{stream.About}</p>
            </div>

            
        </li>
        
    )
}
