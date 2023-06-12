import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from '../reducers/userReducer';

export default function NotLoggedInRoutes() {
    const { user } = useSelector(userSelector);
    return user ? <Navigate to="/" /> : <Outlet />;
}
