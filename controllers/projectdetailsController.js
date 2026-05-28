import Floor from "../models/ProjectDetails.js";

// ================= GET ALL FLOORS =================
export const getAllFloors = async (req, res) => {
    try {
        const floors = await Floor.find();

        res.status(200).json({
            success: true,
            data: floors,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= CREATE FLOORS =================
export const createFloors = async (req, res) => {
    try {
        const data = req.body;

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty",
            });
        }

        const floorsArray = Array.isArray(data) ? data : [data];

        for (let floor of floorsArray) {
            if (!floor.name || !floor.id) {
                return res.status(400).json({
                    success: false,
                    message: "Each floor must have id and name",
                });
            }
        }

        const floors = await Floor.insertMany(floorsArray);

        res.status(201).json({
            success: true,
            message: "Floor data created successfully",
            count: floors.length,
            data: floors,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= UPDATE SINGLE FLOOR =================
export const updateFloors = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedFloor = await Floor.findOneAndUpdate(
            { id: id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedFloor) {
            return res.status(404).json({
                success: false,
                message: "Floor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Floor updated successfully",
            data: updatedFloor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= BULK UPDATE =================
export const updateBulkFloors = async (req, res) => {
    try {
        const updates = req.body;

        if (!Array.isArray(updates)) {
            return res.status(400).json({
                success: false,
                message: "Send an array of floors",
            });
        }

        for (let item of updates) {

            // Update floor fields
            if (item.tool3) {
                await Floor.updateOne(
                    { id: item.id },
                    {
                        $set: {
                            tool3: item.tool3,
                        },
                    }
                );
            }

            // Update unit fields
            if (item.unitId) {

                const updateFields = {};

                if (item.image2D)
                    updateFields["units.$.image2D"] = item.image2D;

                if (item.image3D)
                    updateFields["units.$.image3D"] = item.image3D;

                if (item.overlayImage)
                    updateFields["units.$.overlayImage"] = item.overlayImage;

                if (Object.keys(updateFields).length > 0) {
                    await Floor.updateOne(
                        {
                            id: item.id,
                            "units.id": item.unitId,
                        },
                        {
                            $set: updateFields,
                        }
                    );
                }
            }
        }

        const ids = updates.map((item) => item.id);

        const results = await Floor.find({
            id: { $in: ids },
        });

        res.status(200).json({
            success: true,
            data: results,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};