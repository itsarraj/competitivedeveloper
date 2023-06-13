import { Link } from 'react-router-dom';
import styles from './home.module.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../reducers/userReducer';
import CreatePost from '../../components/Home/CreatePost';

export default function Home() {
    const user = useSelector(userSelector);
    console.log('user home', user);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <CreatePost user={user} />
            </div>
        </div>
    );
}
