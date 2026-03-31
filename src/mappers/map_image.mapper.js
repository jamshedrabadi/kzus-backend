export const mapUploadMapImageRequest = (mapImageData) => {
    const mappedMapImageData = {
        image_id: Number(mapImageData.imageId) || null,
        map_id: Number(mapImageData.mapId),
        display_order: Number(mapImageData.displayOrder) || null,
    };

    return mappedMapImageData;
};
