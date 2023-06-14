import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from '../../reducers/userReducer';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Navbar() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const [navProfileName, setNavProfileName] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (user?.id) {
            const name = user.first_name + ' ' + user.last_name;
            if (name.length > 15) {
                let newName = name.slice(0, 15);
                newName = newName.concat('...');
                setNavProfileName(newName);
            }
            setIsAuthenticated(true);
        }
    }, [user, navProfileName, isAuthenticated]);

    useEffect(() => {
        setNavProfileName(user.first_name + ' ' + user.last_name);
    }, [user, navProfileName, isAuthenticated]);

    const logoutFunction = async () => {
        try {
            console.log('logout', user);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            console.log('data', data);
            dispatch(userActions.LOGOUT());
            setIsAuthenticated(false);
            setNavProfileName('');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link to="/" className={styles.headerLogo}>
                        <div className={styles.logo}>
                            <img src="/favicon/favicon.ico" alt="" />
                        </div>
                    </Link>
                    <span className={styles.cdimg}>
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
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className={styles.profile_link}>
                                <span className={styles.insidelink}>
                                    <img
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                        alt=""
                                        className={styles.img}
                                        width="40rem"
                                    />
                                    <span className={styles.txt}>
                                        {navProfileName}
                                    </span>
                                </span>
                            </Link>
                            <Link to="/">
                                <button
                                    className={styles.Logout}
                                    onClick={logoutFunction}
                                >
                                    <div className={styles.txt}>
                                        <span>Logout</span>
                                    </div>
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}
