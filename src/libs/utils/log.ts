import { initDate } from "./date"

export const recordLog = (params) => {
    let obj = {
        createDate: initDate(),
        params: params,
        page: window.location.href
    }
    console.log(obj);
    
}