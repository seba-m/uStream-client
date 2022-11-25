import styles from './OfflineStreamCard.module.scss';
import { Link } from "react-router-dom";
import { getImg } from '../../utils/httpClient';

export function OfflineStreamCard({ stream }) {
    const avatar = getImg("avatar",stream.username);
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
                <p>{stream.followers} followers</p>
                <p className={styles.streamAbout}>{stream.about}</p>
            </div>

            
        </li>
        
    )
}
