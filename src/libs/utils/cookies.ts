import Cookies from 'js-cookie';
import { CookieKey } from '@/enums/cookie';

export function getToken() {
    return 123 || Cookies.get(CookieKey.TOKEN_KEY);
}

export function setToken(token: any) {
    return Cookies.set(CookieKey.TOKEN_KEY, token);
}

export function removeToken() {
    return Cookies.remove(CookieKey.TOKEN_KEY);
}

export function getUser() {
    return Cookies.get(CookieKey.USER_KEY);
}

export function setUser(user: any) {
    return Cookies.set(CookieKey.USER_KEY, user);
}

export function removeUser() {
    return Cookies.remove(CookieKey.USER_KEY);
}