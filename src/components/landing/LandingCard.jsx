import { useEffect, useState } from "react";
import styles from "./LandingCard.module.scss";

import UserService from "../../services/User.service";
import PlaceHolder from "../../placeholder.jpg";

import { Link } from "react-router-dom";

export function LandingCard({ stream, color }) {

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
            <img style={{boxShadow: `0px 0px 0px 5px ${color? color : stream.color}`}} className={styles.imageBorder} src={avatar} alt={stream.username} />
        </div>
        <h3>{stream.username}</h3>
      </div>
    </Link>
  );
}