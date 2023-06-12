import { Link } from 'react-router-dom';
import styles from './home.module.css';
import { useSelector } from 'react-redux';
import { userSelector } from '../../reducers/userReducer';
import CreatePost from '../../components/Home/CreatePost';

export default function Home() {
    const { user } = useSelector(userSelector);
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <CreatePost user={user} />
            </div>
        </div>
    );
}
