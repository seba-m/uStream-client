import { StreamGrid } from '../components/StreamGrid'
import { Search } from '../components/Search'
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

export function LandingPage() {
    const query = useQuery();
    const search = query.get('search');

    const debouncedSearch = useDebounce(search, 500);

    return (
        <div>
            <Search />
            <StreamGrid key={debouncedSearch} search={debouncedSearch} />
        </div>
    )
}
