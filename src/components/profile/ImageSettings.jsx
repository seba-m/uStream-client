import {useEffect, useState} from "react";

import { ImageUpload } from "../ImageUpload";

import UserService from "../../services/User.service";
import PlaceHolder from "../../placeholder.jpg";

import styles from "./ImageSettings.module.scss";

export function ImageSettings({ user }) {
  const [defaultAvatar, setDefaultAvatar] = useState(PlaceHolder);
  const [defaultBanner, setDefaultBanner] = useState(PlaceHolder);

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
    }
  }, [user.userName]);

  return (
    <>
      {/*<h2 >Image Settings</h2>*/}
      <div className={styles.profileEditContainer}>
        <h3 className={styles.subtitle}>Profile Image</h3>
        <div className={styles.imageSection}> 
            <ImageUpload
              defaultImage={defaultAvatar}
              onUpload={UserService.updateProfileImage}
              onDelete={UserService.deleteProfileImage}
              isBanner={false}/>
        </div>

        <h3 className={styles.subtitle}>Profile Banner</h3>
        <div className={styles.imageSection}>
            <ImageUpload
              defaultImage={defaultBanner}
              onUpload={UserService.updateProfileBanner}
              onDelete={UserService.deleteProfileBanner}
              isBanner={true}/>
        </div>
      </div>
    </>
  );
}
