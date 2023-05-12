import { useEffect } from 'react';
import { getAccessToken } from 'axios-jwt';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../api/slices/userApi';

const useAuthorization = (role?: string) => {
    const navigate = useNavigate();

    const token = getAccessToken();
    const data = (token ? jwtDecode(token) : {}) as { Id: string; Role: string };
    const { data: user, isError, isFetching } = useGetUserByIdQuery(data?.Id);

    useEffect(() => {
        if (role && !isFetching && (isError || user?.role !== role)) {
            navigate('/?login=true');
        }
    });

    return user;
};

export default useAuthorization;
