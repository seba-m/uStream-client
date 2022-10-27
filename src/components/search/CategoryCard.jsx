export function CategoryCard({ category }) {
	return (
		<div>
			<h1>{category.name}</h1>
			<h2>{category.spectators}</h2>
			<h3>{category.tags}</h3>
		</div>
	)
}
