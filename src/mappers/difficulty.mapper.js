export const mapGetDifficultyListResponse = (difficultyData) => {
    const mappedPlayerData = difficultyData.map((difficulty) => {
        return {
            difficultyId: difficulty.difficulty_id,
            difficultyName: difficulty.difficulty_name,
            difficultyMultiplier: difficulty.difficulty_multiplier,
        };
    });

    return mappedPlayerData;
};
