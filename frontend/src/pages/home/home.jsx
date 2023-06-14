import styles from './home.module.scss';
import { userSelector } from '../../reducers/userReducer';
import CreatePost from '../../components/Home/CreatePost';
import { useSelector } from 'react-redux';
import { postSelector } from '../../reducers/postReducer';
import PostSection from '../../components/Home/PostSection';

export default function Home() {
    const user = useSelector(userSelector);
    const posts = useSelector(postSelector);
    console.log('selector ', posts);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <CreatePost user={user} />
                {posts.map((post) => (
                    <PostSection key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}
