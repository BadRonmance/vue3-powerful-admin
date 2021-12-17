interface dateItem {
  year: string;
  month: string;
  day: string;
  hh: string;
  mm: string;
  ss: string
}

/**
 * @description: 时间初始化
 * @version: 1.0.0
 * @param {string} currentDate 锚定日期 不传的情况下默认为当前日期
 * @param {string} format 默认为YYYY-MM-DD HH:MM:SS
 * @return {string} 格式化后的时间
 * @author: 张泽锋
 * @Date: 2021-08-12 10:39:24
 */
export function initDate(currentDate = '', format = 'YYYY-MM-DD HH:MM:SS') {
    var date = currentDate === '' ? new Date() : new Date(currentDate);

    return resultTime(format, getDate(date));
}
/**
 * @description: 校验时间大小
 * @version: 1.0.0
 * @param {*} date 时间一
 * @param {*} date1 时间二
 * @return {Boolean} 时间二大于时间一则返回true
 * @author: 张泽锋
 * @Date: 2021-06-17 10:45:09
 */
export function checkDate(date: Date, date1: Date) {
    date = new Date(date);
    date1 = new Date(date1);
    return date.getTime() - date1.getTime() <= 0;
}
/**
 * @description: 计算N天前或者N天后的日期
 * @version: 1.0.0
 * @param {string} type front(前) after（后） 计算当前时间固定前后日期
 * @param {int} interval 间隔天数 默认为3
 * @param {string} currentDate 锚定日期 不传的情况下默认为当前日期
 * @param {string} formate 日期格式 默认为YYYY-MM-DD
 * @return {string} 格式化后的时间
 * @author: 张泽锋
 * @Date: 2021-08-12 10:03:57
 */
export function getIntervalDay({
    type = 'front',
    interval = 3,
    currentDate = '',
    format = 'YYYY-MM-DD'
}) {
    var date = currentDate === '' ? new Date() : new Date(currentDate);

    date.setDate(
        type === 'front' ? date.getDate() - interval : date.getDate() + interval
    );
    let dateObj = getDate(date);

    return resultTime(format, dateObj);
}
function formatTen(num: number) {
    return num > 9 ? `${num}` : `0${num}`;
}
export function getDate(date: Date) {
    var year = String(date.getFullYear()),
        month = formatTen(date.getMonth() + 1),
        day = formatTen(date.getDate()),
        hh = formatTen(date.getHours()),
        mm = formatTen(date.getMinutes()),
        ss = formatTen(date.getSeconds());

    return {
        year,
        month,
        day,
        hh,
        mm,
        ss
    };
}

export function resultTime(format = 'YYYY-MM-DD', dateObj: dateItem) {
    let time = '';

    switch (format) {
    case 'YYYY-MM-DD HH:MM:SS':
        time = `${dateObj.year}-${dateObj.month}-${dateObj.day} ${dateObj.hh}:${dateObj.mm}:${dateObj.ss}`;
        break;
    case 'YYYY-MM-DD HH:MM':
        time = `${dateObj.year}-${dateObj.month}-${dateObj.day} ${dateObj.hh}:${dateObj.mm}`;
        break;
    case 'YYYY-MM-DD':
        time = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
        break;
    case 'YYYY-MM':
        time = `${dateObj.year}-${dateObj.month}`;
        break;
    case 'MM-DD':
        time = `${dateObj.month}-${dateObj.day}`;
        break;
    case 'YYYY':
        time = `${dateObj.year}`;
        break;
    case 'MM':
        time = `${dateObj.month}`;
        break;
    case 'DD':
        time = `${dateObj.day}`;
        break;
    case 'HH:MM:SS':
        time = `${dateObj.hh}:${dateObj.mm}:${dateObj.ss}`;
        break;
    case 'HH:MM':
        time = `${dateObj.hh}:${dateObj.mm}`;
        break;
    case 'MM:SS':
        time = `${dateObj.mm}:${dateObj.ss}`;
        break;
    default:
        break;
    }
    return time;
}
