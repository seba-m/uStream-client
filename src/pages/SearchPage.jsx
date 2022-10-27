import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

import { CategoryCard } from '../components/search/CategoryCard';
import { OnlineStreamCard } from '../components/search/OnlineStreamCard';
import { OfflineStreamCard } from '../components/search/OfflineStreamCard';

import { Spinner } from '../components/Spinner';

import GeneralService from '../services/General.service'


export function SearchPage() {
    const query = useQuery();
    const search = query.get('term');

    const debouncedSearch = useDebounce(search, 500);

    const [streams, setStreams] = useState(null);
    const [categories, setCategories] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (debouncedSearch) {

            //first page to get best results,
            const page = 1;
            
            GeneralService.searchStream(debouncedSearch, page).then((data) => {
                setStreams(data.streams)
            }).catch((err) => {
                setStreams(null);
            })

            GeneralService.searchCategory(debouncedSearch, page).then((data) => {
                setCategories(data.categories)
            }).catch((err) => {
                setCategories(null);
            })

            setIsLoading(false);
        } else {
            setIsLoading(false)
            setStreams(null)
            setCategories(null)
        }
    }, [debouncedSearch]);

    if (isLoading) {
        return <Spinner />
    }

    /*if (!search) {
        return null;
    }*/

    return (
        <>
            <h1>Search results for {search}</h1>

            <div>
                <h2>Channels</h2>
                <div>
                    {(streams && streams.length > 0) ? 
                        <div>
                            <div>
                                {streams.map((stream) => {
                                    if (stream && stream.username && stream.title) {
                                        return <OnlineStreamCard key={stream.username} stream={stream} />;
                                    } else if (stream && stream.username) {
                                        return <OfflineStreamCard key={stream.username} stream={stream} />;
                                    }
                                    return null;
                                })}
                            </div>
                            <div>
                                <Link to={`/search/stream?query=${search}`}>Show all</Link>
                            </div>
                        </div>
                        : 
                        <div>
                            <h3>No channels found.</h3>
                        </div>
                    }
                </div>
            </div>
            <div>
                <h2>Categories</h2>
                <div>
                    {(categories && categories.length > 0) ?
                        <div>
                            <div>
                                {categories.map((category) => {
                                    if (category && category.name) {
                                        return <CategoryCard key={category.name} category={category} />;
                                    }
                                    return null;
                                })}
                            </div>
                            <div>
                                <Link to={`/search/category?query=${search}`}>Show all</Link>
                            </div>
                        </div>
                        :
                        <div>
                            <h3>No categories found.</h3>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
