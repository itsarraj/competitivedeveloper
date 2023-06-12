import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from '../reducers/userReducer';

export default function LoggedInRoutes() {
    const { user } = useSelector(userSelector);
    return user ? <Outlet /> : <Navigate to="/login" />;
}
