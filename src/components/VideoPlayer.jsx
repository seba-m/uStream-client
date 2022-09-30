import mpegts from 'mpegts.js';
import { useEffect } from 'react';

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
			setTimeout(() => {
				player.play();
			}, 0);
		}
	};

	useEffect(()=>{
		onLoad(streamUrl);
	}, [streamUrl]);

	return (
		<video id="videoElement"></video>
	)
}
