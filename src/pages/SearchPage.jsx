import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

import { CategoryCard } from '../components/search/CategoryCard';
import { OnlineStreamCard } from '../components/search/OnlineStreamCard';
import { OfflineStreamCard } from '../components/search/OfflineStreamCard';

import { Spinner } from '../components/Spinner';

import GeneralService from '../services/General.service'

import styles from './SearchPage.module.scss';


export function SearchPage() {
    const query = useQuery();
    const search = query.get('term');
    const isTag = query.get('tag');

    const debouncedSearch = useDebounce(search, 500);

    const [streams, setStreams] = useState(null);
    const [categories, setCategories] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (debouncedSearch) {

            //first page to get best results,
            const page = 1;
            
            GeneralService.searchStream(debouncedSearch, page, isTag).then((data) => {
                if (data?.streams) {
                    setStreams(data.streams);
                } else {
                    setStreams([]);
                }
            }).catch((err) => {
                setStreams(null);
            })

            GeneralService.searchCategory(debouncedSearch, page, isTag).then((data) => {
                if (data?.categories) {
                    setCategories(data.categories);
                } else {
                    setCategories([]);
                }
            }).catch((err) => {
                setCategories(null);
            })

            setIsLoading(false);
        } else {
            setIsLoading(false)
            setStreams(null)
            setCategories(null)
        }
    }, [debouncedSearch, isTag]);

    if (isLoading) {
        return <Spinner />
    }

    /*if (!search) {
        return null;
    }*/

    return (
        <>
            <h1 className={styles.title}>Search results for '<b>{search}</b>'</h1>

            <div>
                <h2 className={styles.subTitle}>
                    Channels
                    {streams && streams.length > 5 && (
                        <>
                            <span> -</span>
                            <Link to={`/search/stream?term=${search}`} className={styles.showAll}>Show all</Link>
                        </>
                    )}
                </h2>
                {(streams && streams.length > 0) ? 
                    <>
                        <ul className={styles.content}>
                            {streams.slice(0,5).map((stream) => {
                                if (stream && stream.islive) {
                                    return <OnlineStreamCard key={stream.username} stream={stream} />;
                                } else if (stream && stream.username) {
                                    return <OfflineStreamCard key={stream.username} stream={stream} />;
                                }
                                return null;
                            })}
                        </ul>
                    </>
                    : 
                    <div>
                        <h3 className={styles.notFound}>No channels found.</h3>
                    </div>
                }
            </div>
            <div>
                <h2 className={styles.subTitle}>
                    Categories
                    {categories && categories.length > 5 && (
                        <>
                            <span> -</span>
                            <Link to={`/search/category?term=${search}`}> Show all</Link>
                        </>
                    )}
                </h2>
                {(categories && categories.length > 0) ?
                    <>
                        <ul className={styles.content}>
                            {categories.slice(0, 5).map((category) => {
                                if (category && category.name) {
                                    return <CategoryCard key={category.name} category={category} />;
                                }
                                return null;
                            })}
                        </ul>
                    </>
                    :
                    <div>
                        <h3 className={styles.notFound}>No categories found.</h3>
                    </div>
                }
            </div>
        </>
    )
}
