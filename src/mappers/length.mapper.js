export const mapGetLengthListResponse = (lengthData) => {
    const mappedPlayerData = lengthData.map((length) => {
        return {
            lengthId: length.length_id,
            lengthName: length.length_name,
        };
    });

    return mappedPlayerData;
};
