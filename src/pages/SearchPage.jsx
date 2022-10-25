import { useState, useEffect } from 'react';

import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

import { CategoryCard } from '../components/search/CategoryCard';
import { TagCard } from '../components/search/TagCard';
import { OnlineStreamCard } from '../components/search/OnlineStreamCard';
import { OfflineStreamCard } from '../components/search/OfflineStreamCard';

import GeneralService from '../services/General.service'


export function SearchPage() {
    const query = useQuery();
    const search = query.get('term');

    const debouncedSearch = useDebounce(search, 500);

    const [streams, setStreams] = useState(null);
    const [tags, setTags] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (debouncedSearch) {
            GeneralService.searchStream(debouncedSearch).then((data) => {
                setStreams(data.Streams);
            });

            GeneralService.searchTag(debouncedSearch).then((data) => {
                setTags(data.Tags);
            });

            GeneralService.searchCategory(debouncedSearch).then((data) => {
                setCategories(data.Categories);
            });
        }
    }, [debouncedSearch]);

    return (
        <>
            <h1>Search results for {search}</h1>

            <div>
                <h2>Cannels</h2>
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
                    {(tags && tags.length > 0) ?
                        tags.map((tag) => {
                            if (tag && tag.name) {
                                return <TagCard key={tag.Username} tag={tag} />;
                            }
                            return null;
                        })
                        :
                        <div>
                            <h3>No tags found.</h3>
                        </div>
                    }
                </div>
            </div>
            <div>
                <h2>Tags</h2>
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
                            <h3>No channels found.</h3>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
