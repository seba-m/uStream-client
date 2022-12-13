import { useEffect, useState } from 'react';

import GeneralService from '../services/General.service';

import styles from './FollowButton.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUserMinus
} from "@fortawesome/free-solid-svg-icons";

export function FollowButton({ username }) {
    const [follow, setFollow] = useState(null);

    useEffect(() => {
        const getFollowing = async () => {
            try {
                const data = await GeneralService.isFollowing(username);
                return data.isFollowing;
            } catch (err) {
                return false;
            }
        };
        getFollowing().then(isFollowing => {
            setFollow({ isFollowing });
        });
    }, [username]);

    const handleFollow = (e) => {
        e.preventDefault();
        GeneralService.followStreamer(username)
            .then(() => {
                setFollow({ isFollowing: true });
            })
            .catch(err => {
                // todo: Mostrar un mensaje de error al usuario
            });
    };

    const handleUnfollow = (e) => {
        e.preventDefault();
        GeneralService.unfollowStreamer(username)
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
        return (
            <>
                <button className={styles.followBox} onClick={handleFollow}>Follow</button>
                <FontAwesomeIcon className={styles.followIcon} icon={faUserPlus} />
            </>
        )
    } else {
        return (
            <>
                <button className={styles.followBox} onClick={handleUnfollow}>Unfollow</button>
                <FontAwesomeIcon className={styles.unfollowIcon} icon={faUserMinus} />
            </>
        )
    }
}