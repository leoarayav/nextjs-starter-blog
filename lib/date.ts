import moment from "moment"

export function formatDate(date: string) {
    const today = moment().startOf('day')
    const postDate = moment(date);
    const diffInDays = today.diff(postDate, 'days');

    if (diffInDays === 0) {
        return `${postDate.format('MMMM D, YYYY')} (Today)`;
    } else {
        return `${postDate.format('MMMM D, YYYY')} ${diffInDays} day/s ago`;
    }
}