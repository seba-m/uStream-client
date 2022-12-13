import styles from './CategoryCard.module.scss';
import placeHolder from '../../placeholder.jpg';

import { Link } from "react-router-dom";

export function CategoryCard({ category }) {
	return (
		<li className={styles.categoryCard}>
			<div className={styles.imageContainer}>
				<figure className={styles.imageBorder} style={{ backgroundImage: `url(${category.cover ?? placeHolder})`, backgroundSize: "cover" }}></figure>
			</div>
			<div className={styles.informationContainer}>
				<h1 className={styles.categoryName}>{category.name}</h1>
				<h2 className={styles.categorySpectators}>{category.spectators} spectators</h2>

				{category.tags && (
					<div className={styles.categoryTags}>
						{category.tags.map((tag) =>
							<div key={tag} className={styles.tag}>
								<Link to={`/search/?term=${tag}&tag=true`} className={styles.tagUrl}>
									<span>{tag}</span>
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</li>
	)
}

