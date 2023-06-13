import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetUserQuery } from '../api/slices/userApi';

const useAuthorization = (role?: string) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: user, isError, isFetching } = useGetUserQuery();

    useEffect(() => {
        if (user?.role === 'Administrator') return;
        if (role && !isFetching && (isError || user?.role !== role)) {
            navigate('/?login=true&return=' + location.pathname);
        }
    });

    return user;
};

export default useAuthorization;
