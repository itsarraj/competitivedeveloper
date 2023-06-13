import { Link, useParams } from 'react-router-dom';
import styles from './home.module.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../reducers/userReducer';
import CreatePost from '../../components/Home/CreatePost';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Activate() {
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    // const { id, slicedToken } = useParams();
    // console.log(id, slicedToken);
    const { token } = useParams();

    useEffect(() => {
        activateAccount();
    }, []);

    const activateAccount = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/activate`,
                { token },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            Cookies.set('user', JSON.stringify({ data }));
        } catch (error) {}
    };
    return (
        <div className={styles.body}>
            <div className={styles.container}></div>
        </div>
    );
}
