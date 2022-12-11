import { CategoryGrid } from '../components/search/CategoryGrid'
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

export function SearchCategory() {
    const query = useQuery();
    const search = query.get('term');
    const isTag = query.get('tag');

    const debouncedSearch = useDebounce(search, 500);

    return (
        <CategoryGrid key={debouncedSearch} search={debouncedSearch} isTag={isTag} />
    )
}