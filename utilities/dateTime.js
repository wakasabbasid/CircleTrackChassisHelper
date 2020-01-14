import moment from 'moment';
import momenttimezone from 'moment-timezone';



    export const date=() => new Date().getDate(); //Current Date
    export const month=() => new Date().getMonth() + 1; //Current Month
    export const year=() => new Date().getFullYear(); //Current Year
    export const hours=() => new Date().getHours(); //Current Hours
    export const min=() => new Date().getMinutes(); //Current Minutes
    export const sec=() => new Date().getSeconds(); //Current Seconds
    export const tracktime = () => (new Date().getHours() >= 12 ? 'PM' : 'AM'); //Current Seconds
    // export const ampm = () => moment()
    // .utcOffset('+05:30')
    // .format(' hh:mm:ss a'); //Current am or pm situation

    export const ampm = () => momenttimezone()
    .format(' hh:mm:ss a'); //Current am or pm situation


    const dateTime={
        date,
        month,
        year,
        hours,
        min,
        sec,
        ampm,
        tracktime
    }
    export default dateTime;