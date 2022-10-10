import { useEffect, useState } from 'react';
import { get } from '../utils/httpClient';
import { OnlineStreamCard } from './streamCard/OnlineStreamCard'
import { OfflineStreamCard } from './streamCard/OfflineStreamCard'

import styles from './StreamGrid.module.scss';
import { Spinner } from './Spinner';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty } from './Empty';

export function StreamGrid({ search }) {
    const [streams, setStreams] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const searchUrl = (search && search !== '')
            ? `/search/stream?query=${search}&page=${page}`
            : `/discover/stream?page=${page}`;

        get(searchUrl).then((data) => {
            setStreams(prevStreams => prevStreams.concat(data.Streams));
            setHasMore(data.page < data.total_pages);
            setIsLoading(false);
        })
    }, [search, page]);

    if (!isLoading && streams.length === 0) {
        return <Empty />
    } 

    return (
        <InfiniteScroll
            dataLength={streams.length}
            hasMore={hasMore}
            next={() => setPage((prevPage) => prevPage + 1)}
            loader={<Spinner />}
            //endMessage={<p className={styles.noMoreStreams}>- You have seen it all -</p>}
        >
            <ul className={styles.streamsGrid}>
                {streams.map((stream) => {
                    if (stream && stream.Username && stream.Title) {
                        return <OnlineStreamCard key={stream.Username} stream={stream} />;
                    } else if (stream && stream.Username) {
                        return <OfflineStreamCard key={stream.Username} stream={stream} />;
                    }
                    return null;
                })}
            </ul>
        </InfiniteScroll>
    )
}
