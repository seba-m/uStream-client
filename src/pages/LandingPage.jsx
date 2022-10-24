import { useState, useEffect } from 'react';

import { Spinner } from '../components/Spinner';

import GeneralService from '../services/General.service';

export default function LandingPage() {

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		GeneralService.getTopStreamers()
			.then(data => {
				setData(data);
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
				<div>
					{data.map(stream => (
						<div key={stream.StreamerName}>
							{stream.StreamerName}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
