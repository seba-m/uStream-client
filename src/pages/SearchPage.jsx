import { useState, useEffect } from 'react';

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

    const debouncedSearch = useDebounce(search, 700);

    const [streams, setStreams] = useState(null);
    const [categories, setCategories] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (debouncedSearch) {

            //first page to get best results,
            const page = 1;
            
            GeneralService.searchStream(debouncedSearch, page).then(setStreams).catch((err) => {
                setStreams(null);
            })

            GeneralService.searchCategory(debouncedSearch, page).then(setCategories).catch((err) => {
                setCategories(null);
            })

            setIsLoading(false);
        }
    }, [debouncedSearch]);

    if (isLoading) {
        return <Spinner />
    }

    if (!search) {
        return null;
    }

    return (
        <>
            <h1>Search results for {search}</h1>

            <div>
                <h2>Channels</h2>
                <div>
                    {(streams && streams.length > 0) ? 
                        streams.map((stream) => {
                            if (stream && stream.Username && stream.Title) {
                                return <OnlineStreamCard key={stream.Username} stream={stream} />;
                            } else if (stream && stream.Username) {
                                return <OfflineStreamCard key={stream.Username} stream={stream} />;
                            }
                            return null;
                        }) 
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
                    {(streams && streams.length > 0) ?
                        categories.map((category) => {
                            if (category && category.Username) {
                                return <CategoryCard key={category.Username} category={category} />;
                            }
                            return null;
                        })
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
