export function CategoryCard({ category }) {
	/*
	name: 'minecraft dungeons',
	spectators: 2_000_000,
	Tags: ['action', 'adventures games', 'rpg'],
	*/
	return (
		<div>
			<h1>{category.name}</h1>
			<h2>{category.spectators}</h2>
			<h3>{category.Tags}</h3>
		</div>
	)
}
