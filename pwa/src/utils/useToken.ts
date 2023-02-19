import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        if (typeof window !== undefined) {
            const token = sessionStorage.getItem('token');
            return token;
        }
    };

    const [token, saveToken] = useState(getToken());

    const setToken = (token: string) => {
        if (typeof window !== undefined) {
            sessionStorage.setItem('token', token);
            saveToken(token);
        }
    };

    return { token, setToken };
}