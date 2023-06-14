import styles from './home.module.scss';
import { userSelector } from '../../reducers/userReducer';
import CreatePost from '../../components/Home/CreatePost';
import { useSelector } from 'react-redux';
// import { postSelector } from '../../reducers/postReducer';

export default function Home() {
    const user = useSelector(userSelector);
    // const posts = useSelector(postSelector);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <CreatePost user={user} />
            </div>
        </div>
    );
}
