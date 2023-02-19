import { useState } from 'react';
import User from '../models/user-type';

export default function useUser() {
    const getUser = () => {
        if (typeof sessionStorage !== undefined) {
            const user = sessionStorage.getItem('user');
            return user ? JSON.parse(user) : user;
        }
    };

    const [user, saveUser] = useState(getUser());

    const setUser = (user: User) => {
        if (typeof sessionStorage !== undefined) {
            sessionStorage.setItem('user', JSON.stringify(user));
            saveUser(user);
        }
    };

    return { user, setUser };
}