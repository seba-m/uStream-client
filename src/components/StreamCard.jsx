import styles from './StreamCard.module.scss';
import { Link } from "react-router-dom";
import { getStreamImg } from '../utils/getStreamImg';

export function StreamCard({ stream }) {
    const imgUrl = getStreamImg(stream.Username, 300);

    return (
        <li className={styles.streamCard}>
            <div>
                <Link to={`/stream/${stream.Username}`}>
                    <img
                        width={230}
                        height={345}
                        className={styles.streamImage}
                        src={imgUrl}
                        alt={stream.title}
                    />
                </Link>
            </div>

            <div className={styles.streamInfo}>
                <Link to={`/stream/${stream.Username}`}>
                    <p className={styles.streamUsername}>{stream.Username}</p>
                </Link>
                <p className={styles.streamCategory}>{stream.Category}</p>
                <p className={styles.streamViews}>{stream.Views}</p>
                <p className={styles.streamTitle}>{stream.Title}</p>
                <p className={styles.streamAbout}>{stream.About}</p>
                <p className={styles.streamTags}>{stream.Tags.join(', ')}</p>
                <br />
            </div>
        </li>
    )
}
