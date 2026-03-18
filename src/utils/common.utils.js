export const formatDbDateToDate = (databaseTimestamp) => {
    const dateObj = new Date(databaseTimestamp);
    const isoString = dateObj.toISOString();
    return isoString.split('T')[0];
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
