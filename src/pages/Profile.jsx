import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import AuthService from "../services/Auth.service";
import UserService from "../services/User.service";
import { Spinner } from "../components/Spinner";

import styles from "./Profile.module.scss";

import { ProfileSettings } from "../components/profile/ProfileSettings";
import { ContactProfile } from "../components/profile/ContactProfile";
import { StreamSettings } from "../components/profile/StreamSettings";
import { ImageSettings } from "../components/profile/ImageSettings";
import { DeleteAccount } from "../components/profile/DeleteAccount";
import { ChannelColorIdentity } from "../components/profile/ChannelColorIdentity";

export function Profile() {
  const [key, setKey] = useState("profile");

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getProfile(user.id).then((data) => {
        setUser(data);
        setIsLoading(false);
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) return null;

  return (
    <>
      <div className={styles.containerSettings}>
        <h2 className={styles.tittle}>Configuration</h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className=""
        >
          <Tab eventKey="profile" title="Profile">
            <div>
              <ProfileSettings user={user} />
            </div>
          </Tab>
          <Tab eventKey="identity" title="Identity">
            <div>
              <ImageSettings user={user} />
            </div>
            <div>
              <ChannelColorIdentity user={user} />
            </div>
          </Tab>
          <Tab eventKey="security" title="Security">
            <div>
              <ContactProfile user={user} />
            </div>
          </Tab>
          <Tab eventKey="stream" title="Stream settings">
            <div>
              <StreamSettings user={user} />
            </div>
            <div>
              <DeleteAccount user={user} />
            </div>
          </Tab>
        </Tabs>
        <div className={styles.line} />
      </div>
    </>
  );
}
