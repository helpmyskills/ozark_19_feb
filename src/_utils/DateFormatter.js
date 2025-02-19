const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DateFormatter = ({ Date }) => {

    const Day = Date.split("-")[2];
    const Month = months[Date.split("-")[1] - 1];
    const Year = Date.split("-")[0];

    return `${Day} ${Month} ${Year}`
}

export default DateFormatter