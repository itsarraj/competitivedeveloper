import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className={styles.body}>
            <header>
                <div className={styles.headerLeft}>
                    <Link to="/" className={styles.headerLogo}>
                        <div className={styles.logo}>
                            <img
                                src="./../public/favicon/favicon.ico"
                                alt=""
                                srcset=""
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles.headerMiddle}>
                    <Link to="/messages" className={styles.messages}>
                        <div className={styles.messagesLogo}>
                            <img src="./../public/icons/messages.svg" alt="" />
                        </div>
                    </Link>
                </div>
                <div className={styles.headerRight}>
                    <div className="search search1">
                        <span>Search</span>
                        <input
                            type="text"
                            placeholder="Search CD"
                            className="hide_input"
                        />
                    </div>
                </div>
                {/* <div className="header_middle">
                    <Link to="/" className="middle_icon active">
                        <HomeActive />
                    </Link>
                    <Link to="/friends" className="middle_icon hover1">
                        <Friends color={color} />
                    </Link>
                </div> */}
                <div className="header_right"></div>
            </header>
        </div>
    );
}
