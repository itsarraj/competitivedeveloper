import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from '../reducers/userReducer';

export default function NotLoggedInRoutes() {
    const user = useSelector(userSelector);
    console.log('not useSelector', user);

    return user ? <Navigate to="/" /> : <Outlet />;
}
