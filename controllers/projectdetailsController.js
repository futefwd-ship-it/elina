// import Floor from "../models/InventoryPage";
import Floor from "../models/ProjectDetails.js";

export default getAllFloors = async (req, res) => {
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



// CreateFloors
// exports.createFloors = async (req, res) => {
//   try {
//     // const floors = await Floor.create(req.body);
//     const floors = await Floor.insertMany(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Floor data created successfully",
//       data: floors
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };




export default createFloors = async (req, res) => {
    try {
        const data = req.body;

        // ✅ 1. Basic validation
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty",
            });
        }

        // ✅ 2. Ensure it's always an array (for bulk insert)
        const floorsArray = Array.isArray(data) ? data : [data];

        // ✅ 3. Optional: Validate required fields manually
        for (let floor of floorsArray) {
            if (!floor.name || !floor.id) {
                return res.status(400).json({
                    success: false,
                    message: "Each floor must have at least 'id' and 'name'",
                });
            }
        }

        // ✅ 4. Bulk insert
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


export default updateFloors = async (req, res) => {

    try {
        const { id } = req.params;

        const updatedFloor = await Floor.findOneAndUpdate(
            {
                id: id
            },
            // req.body,
            { $set: req.body },   // important for PATCH
            { new: true }
        );

        if (!updatedFloor) {
            return res.status(404).json({
                success: false,
                message: "Floor not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Floor Updated successfully!",
            data: updatedFloor,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}


// bulk updation

// exports.updateBulkFloors = async (req, res) => {
//     try {
//         const updates = req.body;

//         if (!Array.isArray(updates)) {
//             return res.status(400).json({
//                 sucess: false,
//                 message: "Send an array of floors to update....",
//             })
//         }

//         // const results=[];

//         // for (let item of updates){
//         //     const updated=await Floor.findOneAndUpdate(
//         //         {id:item.id},
//         //         item,
//         //         {new:true}
//         //     );
//         //     if(updated) results.push(updated);
//         // }

//         const bulkOps = updates.map((item) => ({
//             updateOne: {
//                 filter: { id: item.id },
//                 update: { $set: item },
//             },
//         }));

//         await Floor.bulkWrite(bulkOps);

//         const ids = updates.map(item => item.id);

//         const results = await Floor.find({
//             id: { $in: ids }
//         });

//         res.status(200).json({
//             success: true,
//             data: results
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

//         res.status(200).json({
//             success: true,
//             message: "Bulk Update completed...",
//             count: results.length,
//             // data: results,
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// }


// exports.updateBulkFloors = async (req, res) => {
//     try {
//         const updates = req.body;

//         if (!Array.isArray(updates)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Send an array of floors to update",
//             });
//         }

//         // ✅ Validate id
//         // for (let item of updates) {
//         //     if (!item.id) {
//         //         return res.status(400).json({
//         //             success: false,
//         //             message: "Each item must have an id",
//         //         });
//         //     }
//         // }

//         for (let item of updates) {

//             // ✅ Update floor fields
//             await Floor.updateOne(
//                 { id: item.id },
//                 { $set: { tool3: item.tool3 } }
//             );

//             // ✅ Update unit image (VERY IMPORTANT)
//             if (item.unitId && item.image2D) {
//                 await Floor.updateOne(
//                     { id: item.id, "units.id": item.unitId },
//                     {
//                         $set: {
//                             "units.$.image2D": item.image2D,
//                             "units.$.image3D": item.image3D,
//                             "units.$.overlayImage": item.overlayImage
//                         }
                       
                       
//                     }
//                 );
//             }
//         }

//         // const bulkOps = updates.map((item) => ({
//         //     updateOne: {
//         //         filter: { id: item.id },
//         //         update: { $set: item },
//         //     },
//         // }));


//         const bulkOps = updates.map((item) => {
//             const { id, units, ...rest } = item;
//             const updateQuery = {};

//             if (Object.keys(rest).length > 0) {
//                 updateQuery.$set = rest;
//             }

//             return {
//                 updateOne: {
//                     filter: { id },
//                     update: updateQuery,
//                 },
//             };
//         });

//         await Floor.bulkWrite(bulkOps);

//         const ids = updates.map(item => item.id);

//         const results = await Floor.find({
//             id: { $in: ids }
//         });

//         res.status(200).json({
//             success: true,
//             data: results
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

export default updateBulkFloors = async (req, res) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: "Send an array of floors to update",
      });
    }

    for (let item of updates) {

      // ✅ Update floor fields
      if (item.tool3) {
        await Floor.updateOne(
          { id: item.id },
          { $set: { tool3: item.tool3 } }
        );
      }

      // ✅ Update unit fields
      if (item.unitId) {
        const updateFields = {};

        if (item.image2D) updateFields["units.$.image2D"] = item.image2D;
        if (item.image3D) updateFields["units.$.image3D"] = item.image3D;
        if (item.overlayImage) updateFields["units.$.overlayImage"] = item.overlayImage;

        if (Object.keys(updateFields).length > 0) {
          await Floor.updateOne(
            { id: item.id, "units.id": item.unitId },
            { $set: updateFields }
          );
        }
      }
    }

    const ids = updates.map(item => item.id);

    const results = await Floor.find({
      id: { $in: ids }
    });

    res.status(200).json({
      success: true,
      data: results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};