import { Link } from 'react-router-dom';
import styles from './home.module.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Home() {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <Navbar />
                <div>
                    <Link to="register">Register</Link>
                </div>
                <div>
                    <Link to="login">login</Link>
                </div>
            </div>
        </div>
    );
}
