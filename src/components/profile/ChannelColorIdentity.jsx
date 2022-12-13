import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

import { Spinner } from "../Spinner";

import UserService from "../../services/User.service";
import PlaceHolder from "../../placeholder.jpg";
import { LandingCard } from "../landing/LandingCard";

import styles from "./ChannelColorIdentity.module.scss";

export function ChannelColorIdentity({ user }) {
  const [message, setMessage] = useState("");

  const [defaultAvatar, setDefaultAvatar] = useState(PlaceHolder);
  const [defaultBanner, setDefaultBanner] = useState(PlaceHolder);
  const [colorUser, setColorUser ] = useState(null);
  const [currentColor, setCurrentColor] = useState();

  const stream = {username: user.userName};


  useEffect(() => {
    if (user.userName) {
      UserService.getUserAvatar(user.userName).then((data) => {
        if (data) {
          setDefaultAvatar(data);
        } else {
          setDefaultAvatar(PlaceHolder);
        }
      });
      UserService.getUserBanner(user.userName).then((data) => {
        if (data) {
          setDefaultBanner(data);
        } else {
          setDefaultBanner(PlaceHolder);
        }
      });
      UserService.getColor(user.userName).then((data) => {
        if (data) {
          setCurrentColor(data);
          setColorUser(data);
        } else {
          setCurrentColor("#2ec5ce");
        }
      });
    }
  }, [user.userName]);


  const handleOnChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleProfile = () => {
    UserService.updateChannelColor({
      color: currentColor,
    }).then((error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    });
  };

  

  return (
    <div className={styles.profileColorContainer}>
      
      <h2 className={styles.subtitle}>Your Color Identity</h2>
      <div className={styles.colorSectionBox}>
        {message && (
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            </div>
        )}
        <div className={styles.colorSubBox}>
          <SketchPicker
          className={styles.clrPicker}
          disableAlpha
          color={currentColor}
          onChange={handleOnChange}/>
          <div className={styles.infoUser}>
            <div className={styles.infoUserColums}>
              <div className={styles.infoUserDiv}>
                <img style={{boxShadow: `0px 0px 0px 5px ${currentColor}`, outline:`5px solid ${currentColor}`}} className={styles.imgeProfile} alt="" width={"250px"} src={defaultAvatar}/> 
                <h2>{user.userName}</h2>
              </div>
              <span className={styles.textAbout}>{user.about}</span>
            </div>
            <LandingCard stream={stream} color={currentColor} className={styles.ladingCard} />
          </div>
        </div>
        <div className={`${styles.colorSubBox} ${styles.colorButton}`}>
            {currentColor !== colorUser? 
            <button onClick={handleProfile}>
                <span>Save Changes</span>
            </button>
              : 
            <button disabled>
                <span>Save Changes</span>
            </button>
            }
        </div>        
      </div>
      
    </div>
  );
}
