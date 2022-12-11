import { useEffect, useState } from "react";
import styles from "./LandingCard.module.scss";

import UserService from "../../services/User.service";
import PlaceHolder from "../../placeholder.jpg";

import { Link } from "react-router-dom";

export function LandingCard({ stream }) {

  const [avatar, setAvatar] = useState(PlaceHolder);
  const [banner, setBanner] = useState(PlaceHolder);

  useEffect(() => {
    UserService.getUserAvatar(stream.username)
      .then(data => {
        if (data) {
          setAvatar(data);
        } else {
          setAvatar(PlaceHolder);
        }
      })
  }, [stream.username]);

  useEffect(() => {
    UserService.getUserBanner(stream.username)
      .then(data => {
        if (data) {
          setBanner(data);
        } else {
          setBanner(PlaceHolder);
        }
      })
  }, [stream.username]);

  return (
    <Link
      to={`/stream/${stream.username}`}
      className={
        styles.streamerCard
      } /*style={{ backgroundImage: `url(${banner})`}}*/
    >
      <div className={styles.streamerBackgroundImage}>
        <img src={banner} alt={stream.username} />
        <div className={styles.streamImage}>
          <figure className={styles.imageBorder}>
            <img src={avatar} alt={stream.username} />
          </figure>
        </div>
        <h3>{stream.username}</h3>
      </div>
    </Link>
  );
}