import { StreamGrid } from '../components/StreamGrid'
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

export function SearchPage() {
    const query = useQuery();
    const search = query.get('term');

    const debouncedSearch = useDebounce(search, 500);

    return (
        <StreamGrid key={debouncedSearch} search={debouncedSearch} />
    )
}
