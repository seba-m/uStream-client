import styles from './CategoryCard.module.scss';
import placeHolder from '../../placeholder.jpg';

export function CategoryCard({ category }) {
	return (
		<div className={styles.categoryCard}>
			<div className={styles.imageContainer}>
				<img src={category.cover ?? placeHolder} alt={category.name} />
			</div>
			<div className={styles.informationContainer}>
				<h1 className={styles.categoryName}>{category.name}</h1>
				<h2 className={styles.categorySpectators}>{category.spectators}</h2>

				{category.tags && (
					<div className={styles.streamTags}>
						{category.tags.map((tag) =>
							<div key={tag} className={styles.tag}>
								<div className={styles.tagUrl}>
									<span>{tag}</span>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

