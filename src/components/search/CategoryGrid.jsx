import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoryGrid.module.scss';
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

        GeneralService.searchCategory(search, page).then((data) => {
            setCategory(prevStreams => prevStreams.concat(data.categories));
            setHasMore(data.page < data.total_pages);
            setIsLoading(false);
        })
    }, [search, page]);

    if (!isLoading && category.length === 0) {
        return <Empty search={search} />
    }

    return (
        <>
            <div>
                <h2>Go back to <Link to={`/search/?term=${search}`}><b>search page</b></Link></h2>
            </div>
            <InfiniteScroll
                dataLength={category.length}
                hasMore={hasMore}
                next={() => setPage((prevPage) => prevPage + 1)}
                loader={<Spinner />}
                endMessage={<p className={styles.noMoreStreams}>- You have seen it all -</p>}
            >
                <ul className={styles.CategoriesGrid}>
                    {category.map((category) => {
                        if (category && category.name) {
                            return <CategoryCard key={category.name} category={category} />;
                        }
                        return null;
                    })}
                </ul>
            </InfiniteScroll>
        </>
    )
}
