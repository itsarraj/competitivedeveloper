import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './login.module.css';
import Link from 'react-router-dom';

export default function Login() {
    return (
        <div className="login">
            <div className="login_wrapper">
                <div className="login_wrap">
                    <div className="login_1">
                        <img
                            src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202303/twitter-feature-sixteen_nine.jpg?size=948:533"
                            alt="Logo"
                        />
                        <span>We help developer connect with each other </span>
                    </div>
                    <div className="login_2">
                        <div className="login_2_wrap">
                            <Formik>
                                {(formik) => (
                                    <Form>
                                        <input type="text" />
                                        <input type="text" />
                                        <button type="submit">Login</button>
                                    </Form>
                                )}
                            </Formik>
                            <Link to="/forgot">Forgtten Password ?</Link>
                        </div>
                    </div>
                </div>
                <div className="register"></div>
            </div>
        </div>
    );
}
