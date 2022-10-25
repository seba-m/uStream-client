import { TagGrid } from '../components/search/TagGrid';
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

export function SearchTag() {
    const query = useQuery();
    const search = query.get('term');

    const debouncedSearch = useDebounce(search, 500);

    return (
        <TagGrid key={debouncedSearch} search={debouncedSearch} />
    )
}
