import { eq } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { mapImages } from "../db/schema/map_images.schema.js";
import { deleteFromR2 } from "./r2.service.js";

export const upsertMapImage = async (mapImageData, imageKey) => {
    try {
        let mapImageResponse = null;
        let oldKey = null;

        if (mapImageData.image_id) { // edit
            const existingMapImage = await getExistingMapImage(mapImageData.image_id);
            if (!existingMapImage) {
                throw new Error("Image not found for existing image ID.");
            }

            oldKey = existingMapImage.image_url;

            mapImageResponse = await updateMapImageInDb(mapImageData, imageKey);
        } else { // insert
            mapImageResponse = await insertMapImageInDb(mapImageData, imageKey);
        }

        return { mapImageResponse: mapImageResponse, oldKey: oldKey };
    } catch (error) {
        console.error("Error in upsertMapImage: ", error);

        await deleteFromR2(imageKey); // delete the image uploaded to r2 if any DB error
    }
};

export const getExistingMapImage = async (imageId) => {
    try {
        const existingMapImage = await db
            .select({
                id: mapImages.id,
                map_id: mapImages.map_id,
                image_url: mapImages.image_url,
                display_order: mapImages.display_order,
            })
            .from(mapImages)
            .where(
                eq(mapImages.id, imageId),
            )
            .limit(1);

        return existingMapImage[0];
    } catch (error) {
        console.error("Error in getExistingMapImage: ", error);
    }
};

export const updateMapImageInDb = async (mapImageData, imageKey) => {
    try {
        const updateMapImageResponse = await db
            .update(mapImages)
            .set({
                display_order: mapImageData.display_order,
                image_url: imageKey,
            })
            .where(
                eq(mapImages.id, mapImageData.image_id),
            )
            .returning();

        return updateMapImageResponse[0].id;
    } catch (error) {
        console.error("Error in updateMapImageInDb: ", error);
    }
};

export const insertMapImageInDb = async (mapImageData, imageKey) => {
    try {
        const insertMapImageResponse = await db
            .insert(mapImages)
            .values({
                ...mapImageData,
                image_url: imageKey,
            })
            .returning();

        return insertMapImageResponse[0].id;
    } catch (error) {
        console.error("Error in insertMapImageInDb: ", error);
    }
};
