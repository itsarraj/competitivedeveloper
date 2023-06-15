import { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import Cookies from 'js-cookie';
import { userActions, userSelector } from '../../reducers/userReducer';

function Profile() {
    const user = useSelector(userSelector);
    const [toggleEditAvatar, setToggleEditAvatar] = useState(false);
    const initialProfileData = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        birthYear: new Date().getFullYear(),
        birthMonth: new Date().getMonth() + 1,
        birthDay: new Date().getDate(),
        gender: '',
        avatar: '',
    };

    const [profileData, setProfileData] = useState(initialProfileData);

    const avatarData = [
        '/avatar/Bot-0.svg',
        '/avatar/Bot-1.svg',
        '/avatar/Bot-2.svg',
        '/avatar/Bot-3.svg',
        '/avatar/Bot-4.svg',
        '/avatar/Bot-5.svg',
        '/avatar/Bot-6.svg',
        '/avatar/Bot-7.svg',
        '/avatar/Bot-8.svg',
    ];

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const [login, setLogin] = useState(loginInfos);
    // const { email, password } = login;
    // const handleLoginChange = (e) => {
    //     const { name, value } = e.target;
    //     setLogin({ ...login, [name]: value });
    // };
    // const [loading, setLoading] = useState(false);
    // const userInfos = {
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     password: '',
    //     birthYear: new Date().getFullYear(), // getFullYear() returns 4-digit year
    //     birthMonth: new Date().getMonth() + 1, // getMonth() returns 0-11
    //     birthDay: new Date().getDate(), // getDate() returns 1-31
    //     gender: '',
    // };
    // const [user, setUser] = useState(userInfos);
    // const {
    //     first_name,
    //     last_name,
    //     email,
    //     password,
    //     birthYear,
    //     birthMonth,
    //     birthDay,
    //     gender,
    // } = user;

    const yearTemp = new Date().getFullYear();
    const years = Array.from(new Array(110), (v, i) => yearTemp - i);
    const months = Array.from(new Array(12), (v, i) => 1 + i);
    const getDays = () => {
        return new Date(
            profileData.birthYear,
            profileData.birthMonth,
            0
        ).getDate();
    };
    console.log('getDays', getDays());
    const days = Array.from(
        new Array(parseInt(getDays() || 31)),
        (v, i) => 1 + i
    );
    console.log('days', days);
    // handle change
    const handleProfileDataChange = (e) => {
        const { name, value } = e.target;
        console.log('name', name);
        console.log('value', value);

        setProfileData((prevData) => ({ ...prevData, [name]: value }));
        // setUser({ ...user, [name]: value });
    };
    const handleProfileDataAvatarChange = (name, value) => {
        console.log('name', name);
        console.log('value', value);

        setProfileData((prevData) => ({ ...prevData, [name]: value }));
        // setUser({ ...user, [name]: value });
    };
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
            if (data) {
                setProfileData(data);
            } else {
                setProfileData(initialProfileData);
            }
            console.log('data', data);
        } catch (error) {
            console.log('error', error);
        }
    };

    console.log('profileData', profileData);
    useEffect(() => {
        profileDataFetch();
    }, []);

    const getFormattedDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const getDaysFromCreatedAt = () => {
        const createdAtDate = new Date(profileData.createdAt);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate - createdAtDate);
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate days

        return {
            days,
            formattedDate: getFormattedDate(createdAtDate),
        };
    };
    const changeDataSend = async () => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/profile`,
                profileData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            dispatch(userActions.PROFILE_REFRESH(data));
            console.log('data', data);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.profile_container_wrap}>
                    <div className={styles.profile_data_container_wrap}>
                        <div className={styles.profile_data_container}>
                            <div
                                className={styles.profile_data_container_header}
                            >
                                <div
                                    className={
                                        styles.profile_data_avatar_container_wrap
                                    }
                                >
                                    <div
                                        className={styles.avatar_container_wrap}
                                    >
                                        <div
                                            className={
                                                styles.profile_data_avatar_container
                                            }
                                        >
                                            <img
                                                src={profileData.avatar}
                                                alt="avatar"
                                                srcSet=""
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles.profile_edit_option
                                            }
                                            onClick={() =>
                                                setToggleEditAvatar(
                                                    !toggleEditAvatar
                                                )
                                            }
                                        >
                                            <img
                                                src="/assets/profile/pen.svg"
                                                alt="edit"
                                                srcSet=""
                                            />
                                        </div>
                                    </div>
                                    {/* Selection of Avatar */}
                                    <span className={styles.avatar_change_text}>
                                        Select one to Change Avatar
                                    </span>
                                    {toggleEditAvatar && (
                                        <div
                                            className={
                                                styles.select_avatar_container_wrap
                                            }
                                        >
                                            {avatarData.map((avatar) => (
                                                <>
                                                    <div
                                                        name="avatar"
                                                        key={avatar}
                                                        className={
                                                            styles.select_avatar_container
                                                        }
                                                    >
                                                        <img
                                                            src={avatar}
                                                            alt={avatar}
                                                            name="avatar"
                                                            id="avatar"
                                                            value={avatar}
                                                            onClick={() =>
                                                                handleProfileDataAvatarChange(
                                                                    'avatar',
                                                                    avatar
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span
                                    className={
                                        styles.profile_data_input_container
                                    }
                                >
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={profileData.username}
                                        onChange={handleProfileDataChange}
                                    />
                                </span>
                                <span
                                    className={
                                        styles.profile_data_input_container
                                    }
                                >
                                    <label htmlFor="first_name">
                                        first_name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        value={profileData.first_name}
                                        onChange={handleProfileDataChange}
                                    />
                                </span>
                                <span
                                    className={
                                        styles.profile_data_input_container
                                    }
                                >
                                    <label htmlFor="last_name">last_name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        value={profileData.last_name}
                                        onChange={handleProfileDataChange}
                                    />
                                </span>
                                <span
                                    className={
                                        styles.profile_data_input_container
                                    }
                                >
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={profileData.email}
                                        onChange={handleProfileDataChange}
                                    />
                                </span>
                            </div>
                            <div
                                className={
                                    styles.profile_data_container_body_wrap
                                }
                            >
                                <div
                                    className={
                                        styles.profile_data_container_body
                                    }
                                >
                                    {/* DOB */}
                                    <div className={styles.dob}>
                                        <label>Date of birth</label>
                                        <span className={styles.selectBOD}>
                                            <select
                                                name="birthDay"
                                                onChange={
                                                    handleProfileDataChange
                                                }
                                                value={profileData.birthDay}
                                            >
                                                {days.map((day, i) => (
                                                    <option value={day} key={i}>
                                                        {day}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                name="birthMonth"
                                                onChange={
                                                    handleProfileDataChange
                                                }
                                                value={profileData.birthMonth}
                                            >
                                                {months.map((month, i) => (
                                                    <option
                                                        value={month}
                                                        key={i}
                                                    >
                                                        {month}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                name="birthYear"
                                                onChange={
                                                    handleProfileDataChange
                                                }
                                                value={profileData.birthYear}
                                            >
                                                {years.map((year, i) => (
                                                    <option
                                                        value={year}
                                                        key={i}
                                                    >
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </span>
                                    </div>
                                    {/* GENDER */}
                                    <div className={styles.gender}>
                                        <label>Gender</label>
                                        <span className={styles.inputGender}>
                                            <label htmlFor="male">
                                                male
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="male"
                                                    value="male"
                                                    checked={
                                                        profileData.gender ===
                                                        'male'
                                                    }
                                                    onChange={
                                                        handleProfileDataChange
                                                    }
                                                />
                                            </label>
                                            <label htmlFor="female">
                                                female
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="female"
                                                    value="female"
                                                    checked={
                                                        profileData.gender ===
                                                        'female'
                                                    }
                                                    onChange={
                                                        handleProfileDataChange
                                                    }
                                                />
                                            </label>
                                            <label htmlFor="other">
                                                other
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="other"
                                                    value="other"
                                                    checked={
                                                        profileData.gender ===
                                                        'other'
                                                    }
                                                    onChange={
                                                        handleProfileDataChange
                                                    }
                                                />
                                            </label>
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            styles.submit_change_button_wrap
                                        }
                                    >
                                        {' '}
                                        <div
                                            className={
                                                styles.submit_change_button
                                            }
                                        >
                                            <button onClick={changeDataSend}>
                                                <span>Submit Changes</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profile_container_footer}>
                                {profileData.createdAt ? (
                                    <>
                                        <div className={styles.first_line}>
                                            <span>
                                                {profileData.first_name}{' '}
                                                {profileData.last_name}
                                            </span>{' '}
                                            is our member from{' '}
                                            <span>
                                                {getDaysFromCreatedAt().days}
                                            </span>{' '}
                                            days.
                                        </div>
                                        <br />
                                        <div className={styles.last_line}>
                                            Joining Date{' '}
                                            {
                                                getDaysFromCreatedAt()
                                                    .formattedDate
                                            }
                                        </div>
                                        <br />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
