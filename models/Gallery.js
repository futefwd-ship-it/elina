import mongoose from 'mongoose';


const imageSchema = new mongoose.Schema({
    image: String,
    title: String
})

const gallerySchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["interior", "exterior"],
        require: true
    },
    images: [imageSchema]
}, { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);