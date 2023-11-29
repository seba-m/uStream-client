import React from "react";

import { BrowserRouter as Router, Outlet } from "react-router-dom";

import styles from "./PageContainer.module.scss";
import { SideBar } from "./landing/SideBar";
import { NavBar } from "./landing/NavBar";

export function PageContainer() {
    return (
        <div className={styles.container}>
            <NavBar />

            <SideBar />

            <section className={styles.contentContainer}>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </section>
        </div>
    );
}
