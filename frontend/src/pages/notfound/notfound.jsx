import styles from './notfound.module.css';
import { Link } from 'react-router-dom';

function Notfound() {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.notfoundimage}>
                        <div className={styles.notfoundtxt}>
                            <span className={styles.oops}>Opss...</span>
                            <span className={styles.pagenotfound}>
                                Page not found
                            </span>
                        </div>

                        <img src="/assets/notfound/notfound404.png" alt="404" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Notfound;
