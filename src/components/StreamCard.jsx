import styles from './StreamCard.module.scss';
import { Link } from "react-router-dom";
import { getStreamImg } from '../utils/getStreamImg';

export function StreamCard({ stream }) {
    //const imgUrl = getStreamImg(stream.poster_path, 300);

    /*
        <img
            width={230}
            height={345}
            className={styles.streamImage}
            //src={imgUrl}
            alt={stream.title}
        />
    */

    return (
        <li className={styles.streamCard}>
            <Link to={`/stream/${stream.Username}`}>
                <p>{stream.Username}</p>
                <p>{stream.Category}</p>
                <p>{stream.Title}</p>
                <p>{stream.Views}</p>
                <p>{stream.About}</p>
                <p>{stream.Tags.join(', ')}</p>
                <p>{stream.Time}</p>
            </Link>
        </li>
    )
}
