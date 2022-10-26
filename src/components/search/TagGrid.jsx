import { useEffect, useState } from 'react';

import styles from './TagGrid.module.scss';
import { Spinner } from '../Spinner';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty } from '../Empty';

import {TagCard} from './TagCard';

import GeneralService from '../../services/General.service'

export function TagGrid({ search }) {
    const [tags, setTags] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        GeneralService.searchTag(search, page).then((data) => {
            setTags(prevTags => prevTags.concat(data.Tags));
            setHasMore(data.page < data.total_pages);
            setIsLoading(false);
        })
    }, [search, page]);

    if (!isLoading && tags.length === 0) {
        return <Empty />
    } 

    return (
        <InfiniteScroll
            dataLength={tags.length}
            hasMore={hasMore}
            next={() => setPage((prevPage) => prevPage + 1)}
            loader={<Spinner />}
            endMessage={<p className={styles.noMoreTags}>- You have seen it all -</p>}
        >
            <ul className={styles.tagsGrid}>
                {tags.map((tag) => {
                    if (tag && tag.Username) {
                        return <TagCard key={tag.Username} tag={tag} />;
                    }
                    return null;
                })}
            </ul>
        </InfiniteScroll>
    )
}