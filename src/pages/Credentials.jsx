import React, { useState, useEffect} from "react";

import Modal from "react-bootstrap/Modal";

import styles from "./Credentials.module.scss";
import { Login } from "./Login";
import { Register } from "./Register";

export function Credentials(props) {
  const [tipo, setTipo] = useState("login");
  


  return (
    <>
      <Modal
        {...props}
        dialogClassName={styles.modalContainer}
        aria-labelledby="contained-modal-title-vcenter"
        animation={false}
        centered
      >
        <div className={styles.credentialsContainer}>
          <div className={styles.logoModal}>
            <div className={styles.logo}>
              <svg
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clippath="url(#clip0_2_80)">
                  <path
                    d="M0.575317 28H10.0685C14.57 28 18.2192 24.3508 18.2192 19.8493H8.726C4.2245 19.8493 0.575317 23.4985 0.575317 28Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                  <path
                    d="M0.575317 8.63012V20.6164C5.07682 20.6164 8.726 16.9672 8.726 12.4657V0.479431C4.2245 0.479431 0.575317 4.12862 0.575317 8.63012Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                  <path
                    d="M27.4247 0H17.9315C13.43 0 9.78082 3.64919 9.78082 8.15068H19.274C23.7755 8.15068 27.4247 4.5015 27.4247 0Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                  <path
                    d="M27.4247 19.3698V7.38354C22.9232 7.38354 19.274 11.0327 19.274 15.5342V27.5205C23.7755 27.5205 27.4247 23.8713 27.4247 19.3698Z"
                    style={{ strokeWidth: "1.6rem" }}
                    fill="#B3BEBD"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_80">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className={styles.textNav}>uStream</h1>
          </div>
          <div className={styles.credentialsContent}>
            <ul className={styles.buttonSelector}>
              <li onClick={() => setTipo("login")} className={styles.active}>
                <span className={styles.textNav}>Login</span>
                <div className={styles.underline}></div>
              </li>
              <li onClick={() => setTipo("register")}>
                <span className={styles.textNav}>Sign up</span>
              </li>
            </ul>
            <div className={styles.forms}>
              {(props.show && tipo==="login")? <Login /> : <Register/>}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Credentials;
