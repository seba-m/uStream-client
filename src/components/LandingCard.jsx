import styles from './LandingCard.module.scss';

import { Link } from 'react-router-dom';

export function LandingCard({ stream }) {

    const { username, avatar, banner } = stream;

    return (
        <Link to={`/stream/${username}`} className={styles.streamerCard} style={{ backgroundImage: `url(${banner})`}}>
            <img src={avatar} alt={username} />
            <h3>{username}</h3>
        </Link>
    )
}
