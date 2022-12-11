import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Search.module.scss';
import { useQuery } from '../hooks/useQuery';

import { FaSearch } from 'react-icons/fa';

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
                <button className={styles.searchButton} type="submit"><FaSearch size={20} className={styles.icon}/></button>
        </form>
    )
}
