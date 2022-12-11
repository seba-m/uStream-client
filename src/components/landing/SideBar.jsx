import { useState, useEffect } from "react";
import styles from "./SideBar.module.scss";

import { SideBarCard } from "./SideBarCard";

import { Spinner } from "../../components/Spinner";

import GeneralService from "../../services/General.service";


export function SideBar() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GeneralService.getTopCategories().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
}

  return (
    <aside className={styles.sideMenu}>
      <h2>For you</h2>
      <h3 className={styles.sideSubtitle}>RECOMENDED CATEGORIES</h3>
      {data.map((category) => {
        return <SideBarCard key={category?.name} category={category}/>;
      })}
    </aside>
  );
}
