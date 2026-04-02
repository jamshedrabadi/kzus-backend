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

export const convertSecondsToMs = (time) => {
    return Math.round(Number(time) * 1000);
};
