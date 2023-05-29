import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './login.module.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div class="container">
        <form id="form" class="form">
            <h2>Registration Form</h2>
            <div class="form-control">
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Enter username">
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="Enter email">
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter password">
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="password">Confirm Password</label>
                <input type="password" id="password2" placeholder="Enter password">
                <small>Error message</small>
            </div>
            <button>Submit</button>
        </form>
    </div>

        // <div className="login">
        //     <div className="login_wrapper">
        //         <div className="login_wrap">
        //             <div className="login_1">
        //                 <img
        //                     src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202303/twitter-feature-sixteen_nine.jpg?size=948:533"
        //                     alt="Logo"
        //                 />
        //                 <span>We help developer connect with each other </span>
        //             </div>
        //             <div className="login_2">
        //                 <div className="login_2_wrap">
        //                     <Formik>
        //                         {(formik) => (
        //                             <Form>
        //                                 <input type="text" />
        //                                 <input type="text" />
        //                                 <button type="submit">Login</button>
        //                             </Form>
        //                         )}
        //                     </Formik>
        //                     <Link to="/forgot">Forgtten Password ?</Link>
        //                     <div className="sign_splitter"></div>
        //                     <button className="blue_btn open_signup">
        //                         Create Account
        //                     </button>
        //                 </div>
        //                 <Link to="/">
        //                     <b>Create a Page</b>
        //                     for a celebrity, band or business.
        //                 </Link>
        //             </div>
        //         </div>
        //         <div className="register"></div>
        //     </div>
        // </div>
    );
}

export default Login;
