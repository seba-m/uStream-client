import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

import GeneralService from '../services/General.service';

import { VideoPlayer } from '../components/VideoPlayer';

export function Video() {
    const { streamerName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [stream, setStream] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        GeneralService.getStream(streamerName)
            .then(data => {
                setStream(data);
                setIsLoading(false);
            })
    }, [streamerName]);

    if (isLoading) {
        return <Spinner />
    }

    if (!stream) return null;

    if (!stream.islive) {
        return navigate("/");
    }

    return (
        <VideoPlayer streamUrl={stream.url} />
    );
}
