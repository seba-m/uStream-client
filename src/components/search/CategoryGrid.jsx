import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoryGrid.module.scss';
import { Spinner } from '../Spinner';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty } from '../Empty';

import GeneralService from '../../services/General.service'
import { CategoryCard } from './CategoryCard';

export function CategoryGrid({ search, isTag }) {
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        GeneralService.searchCategory(search, page, isTag)
            .then((data) => {
                setCategory(prevCategories => prevCategories.concat(data.categories));
                setHasMore(data.currentPage < data.totalPages);
                setIsLoading(false);
            })
    }, [search, isTag, page]);

    if (!isLoading && category.length === 0) {
        return <Empty search={search} />
    }

    return (
        <>
            <div>
                <h2>Go back to <Link to={`/search/?term=${search}`}><b>search page</b></Link></h2>
            </div>
            <InfiniteScroll
                dataLength={ category.length }
                hasMore={hasMore}
                next={() => setPage((prevPage) => prevPage + 1)}
                loader={<Spinner />}
                height={"calc(100vh - 10rem)"}
                endMessage={<p className={styles.noMoreCategories}>- You have seen it all -</p>}
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
