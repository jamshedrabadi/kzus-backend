export const formatDbDateToDate = (databaseTimestamp) => {
    const dateObj = new Date(databaseTimestamp);
    const isoString = dateObj.toISOString();
    return isoString.split('T')[0];
};
