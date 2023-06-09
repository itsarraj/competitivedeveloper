import { useState } from 'react';
import styles from './register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { userActions } from '../../reducers/userReducer';
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfos = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birthYear: new Date().getFullYear(), // getFullYear() returns 4-digit year
        birthMonth: new Date().getMonth() + 1, // getMonth() returns 0-11
        birthDay: new Date().getDate(), // getDate() returns 1-31
        gender: '',
    };
    const [user, setUser] = useState(userInfos);
    const {
        first_name,
        last_name,
        email,
        password,
        birthYear,
        birthMonth,
        birthDay,
        gender,
    } = user;

    // handle change
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Date Setup
    const yearTemp = new Date().getFullYear();
    const years = Array.from(new Array(110), (v, i) => yearTemp - i);
    const months = Array.from(new Array(12), (v, i) => 1 + i);
    const getDays = () => {
        return new Date(birthYear, birthMonth, 0).getDate();
    };
    const days = Array.from(new Array(getDays()), (v, i) => 1 + i);

    // loading
    let [loading, setLoading] = useState(false);

    const registerSubmit = async () => {
        try {
            console.log('register user', user);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/register`,
                {
                    first_name,
                    last_name,
                    email,
                    password,
                    birthYear,
                    birthMonth,
                    birthDay,
                    gender,
                }
            );
            console.log('data', data);
            setTimeout(() => {
                dispatch(userActions.LOGIN(data));
                Cookies.set('user', JSON.stringify(data));
                navigate('/');
            }, 2000);
        } catch (error) {
            setLoading(false);
        }
    };
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form
                    method="POST"
                    id="form"
                    className={styles.form}
                    onSubmit={(e) => {
                        setLoading(true);
                        e.preventDefault();
                        registerSubmit();
                    }}
                >
                    <h2>Register</h2>
                    <div className={styles.formControl}>
                        <label htmlFor="first_name">First name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="Enter First Name"
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label htmlFor="last_name">Last name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Enter Last Name"
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleRegisterChange}
                        />
                    </div>

                    <div className={`${styles.formControl}  ${styles.dob}`}>
                        <label>Date of birth</label>
                        <span className={styles.selectBOD}>
                            <select
                                name="birthDay"
                                onChange={handleRegisterChange}
                            >
                                {days.map((day, i) => (
                                    <option value={day} key={i}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="birthMonth"
                                onChange={handleRegisterChange}
                            >
                                {months.map((month, i) => (
                                    <option value={month} key={i}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="birthYear"
                                onChange={handleRegisterChange}
                            >
                                {years.map((year, i) => (
                                    <option value={year} key={i}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </div>

                    <div className={`${styles.formControl}  ${styles.gender}`}>
                        <label>Gender</label>
                        <span className={styles.inputGender}>
                            <label htmlFor="male">
                                male
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    onChange={handleRegisterChange}
                                />
                            </label>
                            <label htmlFor="female">
                                female
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    onChange={handleRegisterChange}
                                />
                            </label>
                            <label htmlFor="other">
                                other
                                <input
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    value="other"
                                    onChange={handleRegisterChange}
                                />
                            </label>
                        </span>
                    </div>
                    <button>Register</button>
                    <div className={styles.loading}>
                        <BeatLoader
                            color="#3498db"
                            loading={loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </form>
                <div className={styles.loginlink}>
                    <Link to="/login">
                        <span className={styles.txt}>
                            Already have an account? Login
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
