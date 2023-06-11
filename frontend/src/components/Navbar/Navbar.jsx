import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link to="/" className={styles.headerLogo}>
                        <div className={styles.logo}>
                            <img src="./../public/favicon/favicon.ico" alt="" />
                        </div>
                    </Link>
                    <span>
                        <span className={styles.competitive}>Competitive</span>
                        <span className={styles.developer}>Developer</span>
                    </span>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.SignIn}>
                        <Link to="/">
                            <div className={styles.logo}>
                                <span>Sign In</span>
                            </div>
                        </Link>
                    </button>
                </div>
            </header>
        </div>
    );
}
