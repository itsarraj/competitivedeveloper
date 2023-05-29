import { Link } from 'react-router-dom';
import styles from './home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Home</h1>
            <div>
                <Link to="register">Register</Link>
            </div>
            <div>
                <Link to="login">login</Link>
            </div>
        </div>
    );
}
