import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../reducers/userReducer';

export default function Navbar() {
    const user = useSelector(userSelector);
    console.log('user nav ', user);
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
                        <Link
                            to="/"
                            className={`${styles.links} ${styles.active}`}
                        >
                            <span className={styles.insidelink}>
                                <img
                                    src="/assets/navbar/home.svg"
                                    alt=""
                                    className={styles.img}
                                />
                                <span className={styles.txt}>Home</span>
                            </span>
                        </Link>

                        <Link to="/dashboard" className={styles.links}>
                            <span className={styles.insidelink}>
                                <img
                                    src="/assets/navbar/message.svg"
                                    alt=""
                                    className={styles.img}
                                />
                                <span className={styles.txt}>Messages</span>
                                <div className={styles.notification}>9+</div>
                            </span>
                        </Link>

                        <Link to="/friends" className={styles.links}>
                            <span className={styles.insidelink}>
                                <img
                                    src="/assets/navbar/user-list.svg"
                                    alt=""
                                    className={styles.img}
                                />
                                <span className={styles.txt}>Friends</span>
                                <div className={styles.notification}>9+</div>
                            </span>
                        </Link>

                        <Link to="/search" className={styles.links}>
                            <span className={styles.insidelink}>
                                <img
                                    src="/assets/navbar/search.svg"
                                    alt=""
                                    className={styles.img}
                                />
                                <span className={styles.txt}>Search</span>
                                <div className={styles.notification}>9+</div>
                            </span>
                        </Link>

                        <Link to="/notification" className={styles.links}>
                            <span className={styles.insidelink}>
                                <img
                                    src="/assets/navbar/bell.svg"
                                    alt=""
                                    className={styles.img}
                                />
                                <span className={styles.txt}>Notification</span>
                                <div className={styles.notification}>9+</div>
                            </span>
                        </Link>
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
