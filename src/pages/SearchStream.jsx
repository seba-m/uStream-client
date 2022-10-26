import { StreamGrid } from '../components/search/StreamGrid'
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

export function SearchStream() {
    const query = useQuery();
    const search = query.get('query');

    const debouncedSearch = useDebounce(search, 500);

    return (
        <StreamGrid key={debouncedSearch} search={debouncedSearch} />
    )
}