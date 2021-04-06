import {
    get
} from './axios'

export function getdata() {
    return get('/yishu')
}