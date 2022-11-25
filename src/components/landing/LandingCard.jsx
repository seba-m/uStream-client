import styles from "./LandingCard.module.scss";

import { Link } from "react-router-dom";

export function LandingCard({ stream }) {
  const { username, avatar, banner } = stream;

  return (
    <Link
      to={`/stream/${username}`}
      className={
        styles.streamerCard
      } /*style={{ backgroundImage: `url(${banner})`}}*/
    >
      <div className={styles.streamerBackgroundImage}>
        <img src={banner} alt={username} />
        <div className={styles.streamImage}>
          <Link to={`/stream/${stream.username}`}>
            <figure className={styles.imageBorder}>
              <img src={avatar} alt={username} />
            </figure>
          </Link>
        </div>
        <h3>{username}</h3>
      </div>
      
    </Link>
  );
}
