import styles from "./SideBar.module.scss";

import { Link } from "react-router-dom";


export function SideBarCard({ category }) {

  return (
      <Link to= {`/search/category?term=${category.name}`}>
        
        <div className={styles.sideMenuBox}  style={{ backgroundImage: `url(${category.cover})`}}>
          <h3 className={styles.menuText}>{category.name}</h3>
          <div className={styles.sideCover}>

            
          </div>
          
        </div>
      </Link>
  );
}
