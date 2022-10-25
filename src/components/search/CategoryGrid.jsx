import { useEffect, useState } from 'react';

import styles from './StreamGrid.module.scss';
import { Spinner } from '../Spinner';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty } from '../Empty';

import GeneralService from '../../services/General.service'
import { CategoryCard } from './CategoryCard';

export function CategoryGrid({ search }) {
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        GeneralService.searchStream(search, page).then((data) => {
            setCategory(prevStreams => prevStreams.concat(data.Streams));
            setHasMore(data.page < data.total_pages);
            setIsLoading(false);
        })
    }, [search, page]);

    if (!isLoading && category.length === 0) {
        return <Empty />
    } 

    return (
        <InfiniteScroll
            dataLength={category.length}
            hasMore={hasMore}
            next={() => setPage((prevPage) => prevPage + 1)}
            loader={<Spinner />}
            endMessage={<p className={styles.noMoreStreams}>- You have seen it all -</p>}
        >
            <ul className={styles.streamsGrid}>
                {category.map((stream) => {
                    if (stream && stream.Username) {
                        return <CategoryCard key={stream.Username} stream={stream} />;
                    }
                    return null;
                })}
            </ul>
        </InfiniteScroll>
    )
}
