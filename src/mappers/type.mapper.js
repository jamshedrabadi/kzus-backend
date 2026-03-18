export const mapGetTypeListResponse = (typeData) => {
    const mappedPlayerData = typeData.map((type) => {
        return {
            typeId: type.type_id,
            typeName: type.type_name,
        };
    });

    return mappedPlayerData;
};
