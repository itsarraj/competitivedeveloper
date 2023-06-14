import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from '../reducers/userReducer';

export default function LoggedInRoutes() {
    const user = useSelector(userSelector);
    const flagresult = () => {
        if (user?.id) {
            return true;
        }
        return false;
    };
    let isAuthenticated = flagresult();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
