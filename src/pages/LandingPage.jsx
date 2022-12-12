import { LandingGrid } from "../components/landing/LandingGrid";

import { Hero } from "../components/landing/Hero";
import styles from "./LandingPage.module.scss";

export function LandingPage() {
  return (
    <>
      <Hero />
      <div className={styles.content}>
        <h2>Channels you might like</h2>
        <LandingGrid />
      </div>
    </>
  );
}
