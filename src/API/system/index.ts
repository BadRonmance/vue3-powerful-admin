import http from '@/API/axios';
import type { HttpResponse } from '@/API/types';
import type { UserItem } from '@/views/system/types';

interface UserList extends HttpResponse {
    data: {
        code: number
        message: string
        data: UserItem[]
    }
}

export const getUserList = async (): Promise<UserList> => {
    return http('/api/getUserList', {
        'method': 'get',
        'responseType': 'json'
    });
};