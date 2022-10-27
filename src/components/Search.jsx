import styles from './Search.module.scss';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';

export function Search() {
    const query = useQuery();
    const search = query.get('term');

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const pathName = () => {
        return location.pathname;
    }

    return (
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchBox}>
                <input
                    id='search'
                    className={styles.searchInput}
                    type="text"
                    value={search ?? ""}
                    placeholder="Search"
                    autoFocus
                    aria-label='Search'
                    onChange={(e) => {
                        const value = e.target.value;
                        const currentPath = pathName();

                        if (!currentPath.startsWith("/search")) {
                            navigate('search/?term=' + value);
                        } else {
                            navigate(currentPath + '?term=' + value);
                        }
                    }}
                />
                <FaSearch size={20} color="black" className={styles.searchButton} />
            </div>
        </form>
    )
}
