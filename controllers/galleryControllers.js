import Gallery from "../models/Gallery.js";

export const createGallery=async(req , res)=>{
    try{
        const {category,images}=req.body;
        const gallery=new Gallery({category,images});
        await gallery.save();

        res.status(201).json(gallery);

    }catch(err){
        res.status(500).json({error:err.message});

    }
}

export const getGallery=async (req,res)=>{
    try{
        const data=await Gallery.find();
        res.json(data);
    }catch(err){
        res.status(500).json({error:err.message});

    }
};

export const getByCategory=async(req,res)=>{
    try{
        const data=await Gallery.find({
            category:req.params.category
        });
        res.json(data)

    }catch(err){
        res.status(500).json({error:err.message})
    }
}


export const addImage=async(req,res)=>{
    try{
        const {image,title}=req.body;

        const updated=await Gallery.findByIdAndUpdate(
            req.params.id,
            { $push: {images: {image,title}}},
            {new:true}
        );
        res.json(updated);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

export const deleteImage=async(req,res)=>{
    try{
        const {imageId}=req.params;

        const updated=await Gallery.findByIdAndUpdate(
            req.params.id,

             { $pull:{images:{_id:imageId}}},
             {new:true}
        );
        res.json(updated);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

// rearrange images
// export const rearrangeImages=async(req,res)=>{
//     try{
//         const {images}=req.body;
//         const updated=await Gallery.findByIdAndUpdate(
//             req.params.id,
//             {
//                 images,
//             },
//             {new:true}
//         );
//         re.json(updated);
//     }catch(err){
//         res.status(500).json({error:err.message});
//     }
// }

// rearrange images
export const rearrangeImages = async (req, res) => {
    try {
        const { images } = req.body;
        
        const updated = await Gallery.findByIdAndUpdate(
            req.params.id,
            {
                $set: { images }, // Explicitly sets the new ordered array
            },
            { new: true }
        );
        
        res.json(updated); // Fixed typo from 're' to 'res'
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// DELETE CATEGORY
export const deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};