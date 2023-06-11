import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link to="/" className={styles.headerLogo}>
                        <div className={styles.logo}>
                            <img src="/favicon/favicon.ico" alt="" />
                        </div>
                    </Link>
                    <span>
                        <span className={styles.competitive}>C</span>
                        <span className={styles.developer}>D</span>
                    </span>
                </div>
                <div className={styles.headerCenter}>
                    <div className={styles.navigation}>
                        <span className={styles.links}>
                            <Link to="/">
                                <span className={styles.insidelink}>
                                    <img
                                        src="/assets/navbar/home.svg"
                                        alt=""
                                        className={styles.img}
                                    />
                                    <span className={styles.txt}>Home</span>
                                </span>
                            </Link>
                        </span>
                        <span className={styles.links}>
                            <Link to="/dashboard">
                                <span className={styles.insidelink}>
                                    <img
                                        src="/assets/navbar/website.svg"
                                        alt=""
                                        className={styles.img}
                                    />
                                    <span className={styles.txt}>
                                        Dashboard
                                    </span>
                                </span>
                            </Link>
                        </span>
                        <span className={styles.links}>
                            <Link to="/friends">
                                <span className={styles.insidelink}>
                                    <img
                                        src="/assets/navbar/user-list.svg"
                                        alt=""
                                        className={styles.img}
                                    />
                                    <span className={styles.txt}>Friends</span>
                                </span>
                            </Link>
                        </span>
                        <span className={styles.links}>
                            <Link to="/search">
                                <span className={styles.insidelink}>
                                    <img
                                        src="/assets/navbar/search.svg"
                                        alt=""
                                        className={styles.img}
                                    />
                                    <span className={styles.txt}>Search</span>
                                </span>
                            </Link>
                        </span>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <button className={styles.SignIn}>
                        <Link to="/login">
                            <div className={styles.txt}>
                                <span>Sign In</span>
                            </div>
                        </Link>
                    </button>
                    <button className={styles.register}>
                        <Link to="/register">
                            <div className={styles.txt}>
                                <span>Register</span>
                            </div>
                        </Link>
                    </button>
                </div>
            </header>
        </div>
    );
}
