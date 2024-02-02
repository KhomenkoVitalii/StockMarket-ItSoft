export const isUnder18 = (birthday) => {
    const userBD = new Date(birthday);

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    // Compare the user's date of birth with the date 18 years ago
    return userBD > eighteenYearsAgo;
}

export const beautyTimeStamp = (timestamp) => {
    const stamp = new Date(timestamp);
    return `${stamp.getFullYear()}-${(stamp.getMonth() + 1).toString().padStart(2, '0')}-${stamp.getDate().toString().padStart(2, '0')} ${stamp.getHours().toString().padStart(2, '0')}:${stamp.getMinutes().toString().padStart(2, '0')}`;
}

export const beautyMarketCap = (value) => {
    let metrics = '';
    let result = value;

    if (value >= 1000000000) {
        metrics = 'B';
        result = `${(value / 1000000000).toFixed(2)}${metrics}`;
    } else if (value >= 1000000) {
        metrics = 'M';
        result = `${(value / 1000000).toFixed(2)}${metrics}`;
    } else if (value >= 1000) {
        metrics = 'K';
        result = `${(value / 1000).toFixed(2)}${metrics}`;
    }

    return result;
}