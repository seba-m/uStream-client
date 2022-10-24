import { useEffect } from 'react';
import mpegts from 'mpegts.js';

export function VideoPlayer({ streamUrl }) {

	const onLoad = (streamUrl) => {
		if (mpegts.getFeatureList().mseLivePlayback) {
			var videoElement = document.getElementById('videoElement');
			var player = mpegts.createPlayer({
				type: 'flv',
				isLive: true,
				url: streamUrl
			});
			player.attachMediaElement(videoElement);
			player.load();
			//wait 0.1 second for player to finish
			setTimeout(() => {
				player.play();
			}, 100);
		}
	};

	useEffect(()=>{
		onLoad(streamUrl);
	}, [streamUrl]);

	return (
		<video id="videoElement" controls></video>
	)
}
