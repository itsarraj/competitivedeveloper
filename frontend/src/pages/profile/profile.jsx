import { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import Cookies from 'js-cookie';
import { userActions, userSelector } from '../../reducers/userReducer';

function Login() {
    const user = useSelector(userSelector);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const [login, setLogin] = useState(loginInfos);
    // const { email, password } = login;
    // const handleLoginChange = (e) => {
    //     const { name, value } = e.target;
    //     setLogin({ ...login, [name]: value });
    // };
    // const [loading, setLoading] = useState(false);
    const profileDataFetch = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log('data login', data);
            // dispatch(userActions.LOGIN(data));

            // Cookies.set('user', JSON.stringify(data));
            // navigate('/');
        } catch (error) {}
    };
    useEffect(() => {
        profileDataFetch();
    }, []);
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.profile_container_wrap}>
                    <div className={styles.profile_data_container_wrap}>
                        <div className={styles.profile_data_container}>
                            <span>DATA</span>
                        </div>
                    </div>
                    <div className={styles.profile_form_container}>
                        <div className={styles.profile_data_form_container}>
                            <span>DATA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
