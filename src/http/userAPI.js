import { $authHost, $host } from "./index";

export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
    localStorage.setItem('token', data.token);
    return decodeJWT(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password});
    localStorage.setItem('token', data.token);
    return decodeJWT(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return decodeJWT(data.token);
};

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    
    return JSON.parse(jsonPayload);
}


