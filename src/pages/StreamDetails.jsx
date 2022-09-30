import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
//import { getStreamImg } from '../utils/getStreamImg';
import { get } from '../utils/httpClient';
import { VideoPlayer } from '../components/VideoPlayer';
import styles from './StreamDetails.module.scss';

export function StreamDetails() {

    const { streamName } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        get(`/stream/${streamName}`)
            .then(data => {
                setStream(data);
                setIsLoading(false);
            })
    }, [streamName]);

    if (isLoading) {
        return <Spinner />
    }

    //if (!stream) return null;

    //const imgUrl = "https://image.tmdb.org/t/p/w500" + stream.poster_path;

    //const imgUrl = getStreamImg(stream.poster_path, 500);

    return (
        <div className={styles.detailsContainer}>
            {/*<img className={`${styles.col} ${styles.streamImage}`} src={imgUrl} alt={stream.title} />*/}
            < VideoPlayer streamUrl={stream.Url} />
            <div className={`${styles.col} ${styles.streamDetails}`}>
                <p className={`${styles.firstItem}`}><strong>Title: </strong>{stream.title}</p>
                <p>
                    <strong>Genres: </strong>
                    {stream.genres.map(genre => genre.name).join(', ')}
                </p>
                <p><strong>Overview: </strong>{stream.overview}</p>

            </div>
        </div>
    )
}
