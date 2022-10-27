import { useState, useEffect } from 'react';

import { Spinner } from '../components/Spinner';
import { LandingCard } from '../components/LandingCard';

import GeneralService from '../services/General.service';

import styles from './LandingPage.module.scss';

export default function LandingPage() {

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		GeneralService.getTopStreamers()
			.then(data => {
				setData(data.streamers);
				setIsLoading(false);
			})
	},[]);

	if (isLoading) {
		return <Spinner />
	}

	if (!data) return null;

	return (
		<div>
			<div>
				enjoy the experience ...
			</div>
			<div>
				<h2>Channels you might like</h2>
				<div className={styles.streamsContainer}>
					{data.map(stream => (
						<LandingCard key={stream.username} stream={stream} />
					))}
				</div>
			</div>
		</div>
	)
}
