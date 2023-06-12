import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from '../reducers/userReducer';

export default function LoggedInRoutes() {
    const user = useSelector(userSelector);
    console.log('useSelector', user);
    return user ? <Outlet /> : <Navigate to="/login" />;
}
