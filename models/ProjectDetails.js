import mongoose from "mongoose";

// const polygonSchema=new mongoose.Schema({
//     polygonId:String,
//     tooltip:String,
//     points:String,
// })

const unitSchema = new mongoose.Schema({
    id: Number,
    floorname: String,
    polygon: String,
    tooltip: String,
    image3D: String,
    image2D: String,
    overlayImage: String,
    unitInformation: {
        title: String,
        T1: String,
        T2: String,
    },
    sideContent: [
        {
            id: Number,
            name: String,
            //   polygons:[polygonSchema]
            polygons: [
                {
                    polygonId: String,
                    tooltip: String,
                    points: String,
                }
            ]
        },
    ],
});

const floorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    tool1: String,
    tool2: String,
    id1: String,
    tool3: String,
    polygon: String,
    hoverColor: String,
    units: [unitSchema],
});

// export default mongoose.model("Floor", floorSchema);




const User = mongoose.model('Floor', floorSchema);
export default User;