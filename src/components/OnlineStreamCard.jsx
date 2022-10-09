import styles from './OnlineStreamCard.module.scss';
import { Link } from "react-router-dom";
import { getStreamImg } from '../utils/getStreamImg';

export function OnlineStreamCard({ stream }) {
    const imgUrl = getStreamImg(stream.Username, 300);

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
                <Link to={`/search/category/${stream.Category}`} className={styles.tagUrl}>
                    <p className={styles.streamCategory}>{stream.Category}</p>
                </Link>
                <p className={styles.streamViews}>{stream.Views} spectators</p>
                <p className={styles.streamTitle}>{stream.Title}</p>
                <div className={styles.streamTags}>
                    {stream.Tags.map((tag, index) => 
                        <div className={styles.tag}>
                            <Link to={`/search/tag/${tag}`} className={styles.tagUrl}>
                                <span key={index}>{tag}</span>
                            </Link>
                        </div> 
                    )}
                </div>
            </div>
        </li>
    )
}
