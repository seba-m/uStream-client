import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

export function SearchPage() {
    const query = useQuery();
    const search = query.get('term');

    const debouncedSearch = useDebounce(search, 500);

    return (
        <div>search page</div>
    )
}
