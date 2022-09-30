import styles from './StreamCard.module.scss';
import { Link } from "react-router-dom";
import { getStreamImg } from '../utils/getStreamImg';

export function StreamCard({ stream }) {
    //const imgUrl = getStreamImg(stream.poster_path, 300);

    return (
        <li className={styles.streamCard}>
            <Link to={`/stream/${stream.Name}`}>
                <img
                    width={230}
                    height={345}
                    className={styles.streamImage}
                    //src={imgUrl}
                    alt={stream.title}
                />
                <p>{stream.title}</p>
            </Link>
        </li>
    )
}
