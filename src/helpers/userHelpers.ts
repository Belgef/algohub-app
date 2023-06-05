import { UserViewModel } from '../api/api';
import { STORAGE_BASE_URL } from '../api/constants';

export const getUserName = (user: UserViewModel | null | undefined, raw: boolean = false) =>
    user?.fullName ?? (user?.userName ? (raw ? '' : '@') + user.userName : 'deleted');

export const getUserIconUrl = (user: UserViewModel | null | undefined) =>
    user?.iconName
        ? STORAGE_BASE_URL + user.iconName
        : 'https://ui-avatars.com/api/?rounded=true&name=' + getUserName(user);

export const isAdmin = (user: UserViewModel | null | undefined) => user?.role === 'Administrator'
