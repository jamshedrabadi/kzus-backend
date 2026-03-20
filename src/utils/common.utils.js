export const formatDbDateToDate = (databaseTimestamp) => {
    const dateObj = new Date(databaseTimestamp);
    const year = dateObj.getFullYear();
    let month = (dateObj.getMonth() + 1) + "";
    let day = dateObj.getDate() + "";

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
};

export const convertToNumber = (value) => {
    value ||= 0;
    const num = Number(value);
    return !Number.isNaN(num) ? num : 0;
};

export const convertToDecimalNumber = (value, decimals = 2) => {
    value ||= 0;
    const num = Number(value);
    return !Number.isNaN(num) ? Number(num.toFixed(decimals)) : 0;
};

export const parseIds = (value) => {
    return value
        ? value
            .split(",")
            .map((v) => Number(v.trim()))
            .filter((v) => !isNaN(v))
        : null;
};
