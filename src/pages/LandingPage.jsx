import { useState, useEffect } from "react";

import { Spinner } from "../components/Spinner";
import { LandingCard } from "../components/LandingCard";

import GeneralService from "../services/General.service";

import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GeneralService.getTopStreamers().then((data) => {
      setData(data.streamers);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  //if (!data) return null;

  return (
    <div className={styles.landingContainer}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContentLeft}>
          <h2 className={styles.slogan}>
            Enjoy the
            <br />
            experience
          </h2>
          <h3>Share your favorite things with others!</h3>
          <button>Get started</button>
        </div>
        <div className={styles.heroContentRight}>
          <div className={styles.logoBox}>
            <div className={styles.logo}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_80)">
                  <path
                    d="M0.575317 28H10.0685C14.57 28 18.2192 24.3508 18.2192 19.8493H8.726C4.2245 19.8493 0.575317 23.4985 0.575317 28Z"
                    fill="#2EC5CE"
                  />
                  <path
                    d="M0.575317 8.63012V20.6164C5.07682 20.6164 8.726 16.9672 8.726 12.4657V0.479431C4.2245 0.479431 0.575317 4.12862 0.575317 8.63012Z"
                    fill="#2EC5CE"
                  />
                  <path
                    d="M27.4247 0H17.9315C13.43 0 9.78082 3.64919 9.78082 8.15068H19.274C23.7755 8.15068 27.4247 4.5015 27.4247 0Z"
                    fill="#2EC5CE"
                  />
                  <path
                    d="M27.4247 19.3698V7.38354C22.9232 7.38354 19.274 11.0327 19.274 15.5342V27.5205C23.7755 27.5205 27.4247 23.8713 27.4247 19.3698Z"
                    fill="#2EC5CE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_80">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
			<div className={`${styles.decoration} ${styles.top}`}></div>
			<div className={`${styles.decoration} ${styles.bottom}`}></div>
			<div className={`${styles.decoration} ${styles.left}`}></div>

          </div>
        </div>
      </div>
      <div>
        <h2>Channels you might like</h2>
        <div className={styles.streamsContainer}>
          {/*data.map((stream) => (
            
            <LandingCard key={stream.username} stream={stream} />
          ))*/}
        </div>
      </div>
    </div>
  );
}
