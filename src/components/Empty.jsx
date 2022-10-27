import styles from './Empty.module.scss';

export function Empty({search}) {
    return (
        <div>
            <div className={styles.empty}>
                <h1>We couldn't find any results for "<b>{search}</b>"</h1>
            </div>

            <ul className={styles.options}>
                <li>Make sure all words are spelled correctly.</li>
                <li>Try different words.</li>
            </ul>
        </div>
    )
}
