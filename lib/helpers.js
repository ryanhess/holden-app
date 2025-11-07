export function timeString(dateObj) {
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let formattedTimeStr = '';
    if (hours === 0) {
        formattedTimeStr = `${seconds}s`;
        if (minutes !== 0) {
            formattedTimeStr = minutes + 'm ' + formattedTimeStr;
        }
    } else {
        formattedTimeStr = [hours, minutes, seconds]
            .map(unit => String(unit).padStart(2, '0'))
            .join(':');
    }
    return formattedTimeStr;
}