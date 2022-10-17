import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
//import { getStreamImg } from '../utils/getStreamImg';
import { get } from '../utils/httpClient';

import { OnlineStreamPlayer } from '../components/streamPlayer/OnlineStreamPlayer';
import { OfflineStreamPlayer } from '../components/streamPlayer/OfflineStreamPlayer';

export function StreamDetails() {

    const { streamerName } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        get(`/stream/view/${streamerName}`)
            .then(data => {
                setStream(data);
                setIsLoading(false);
            })
    }, [streamerName]);

    if (isLoading) {
        return <Spinner />
    }

    if (!stream) return null;

    if (stream.IsLive) {
        return <OnlineStreamPlayer stream={stream} />;
    } else {
        return <OfflineStreamPlayer stream={stream} />;
    }
}
