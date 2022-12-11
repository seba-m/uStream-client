import { useEffect, useState } from 'react';

import GeneralService from '../../services/General.service';

import styles from './FollowButton.module.scss';

export function FollowButton({ stream }) {
    const [follow, setFollow] = useState(null);

    useEffect(() => {
        const getFollowing = async () => {
            try {
                const data = await GeneralService.isFollowing(stream.username);
                return data.isFollowing;
            } catch (err) {
                return false;
            }
        };
        getFollowing().then(isFollowing => {
            setFollow({ isFollowing });
        });
    }, [stream.username]);

    const handleFollow = (e) => {
        e.preventDefault();
        GeneralService.followStreamer(stream.username)
            .then(() => {
                setFollow({ isFollowing: true });
            })
            .catch(err => {
                // todo: Mostrar un mensaje de error al usuario
            });
    };

    const handleUnfollow = (e) => {
        e.preventDefault();
        GeneralService.unfollowStreamer(stream.username)
            .then(() => {
                setFollow({ isFollowing: false });
            })
            .catch(err => {
                // todo: Mostrar un mensaje de error al usuario
            });
    };

    if (!follow) {
        return null;
    }

    if (!follow.isFollowing) {
        return <button className={styles.followBox} onClick={handleFollow}>Follow</button>
    } else {
        return <button className={styles.followBox} onClick={handleUnfollow}>Unfollow</button>
    }
}