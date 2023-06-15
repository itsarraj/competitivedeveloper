import styles from './home.module.scss';
import { userSelector } from '../../reducers/userReducer';
import CreatePost from '../../components/Home/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { postActions, postSelector } from '../../reducers/postReducer';
import PostSection from '../../components/Home/PostSection';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const user = useSelector(userSelector);
    const posts = useSelector(postSelector);
    console.log('selector ', posts);

    const dispatch = useDispatch();

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/get-all-posts`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                dispatch(postActions.setPost(data));
            } catch (error) {
                console.log(error);
            }
        };

        if (user && user.token && !posts.length) {
            console.log('getAllPosts called');
            getAllPosts();
        }
    }, []); // Add 'posts' as a dependency

    // Empty dependency array to trigger the effect only once

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
