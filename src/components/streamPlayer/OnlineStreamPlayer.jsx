import styles from './OnlineStreamPlayer.module.scss';
import { VideoPlayer } from '../VideoPlayer';

export function OnlineStreamPlayer({ stream }) {

    return (
        <div className={styles.detailsContainer}>

            <VideoPlayer streamUrl={stream.Url} />
            <div className={`${styles.col} ${styles.streamDetails}`}>
                <p className={`${styles.firstItem}`}><strong>Title: </strong>{stream.title}</p>
                <p>
                    <strong>Genres: </strong>
                    {/*stream.genres.map(genre => genre.name).join(', ')*/}
                </p>
                <p><strong>Overview: </strong>{stream.overview}</p>

            </div>
        </div>
    )
}
