const Image = require('../models/image');
const User = require('../models/user');
const cloudinary = require('../utils/cloudinary');

const uploadImage = async (req, res) => {
    const { image, userId } = req.body;


    if (!image || image === "") {
        return res.status(403).json({ message: "Please upload a file" });
    }
    if (!userId || userId === "") {
        return res.status(403).json({ message: "Please login to continue" });
    }

    const user = await Image.findOne({userId});
    const result = await cloudinary.uploader.upload(image, {
        folder: "profiles",
        // width: 300,
        // crop: "scale"
    })
    if (!user) {
        const image = await Image.create({
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            userId
        });
        return res.status(201).json(image);
    }
    else{
        const image = await updateImage(result,userId,user._id);
        return res.status(201).json(image);
    }



}

const getImage = async (req, res) => {
    const { userId } = req.params;
    if (!userId || userId === "") {
        return res.status(403).json({ message: "Please login to continue" });
    }
    const image = await Image.findOne({ userId});
    if (!image) {
        return res.status(404).json({ message: "Image not found" });
    }
    return res.status(200).json(image);
}

const updateImage = async (result,userId,id) => {
    
    const updatedImage = await Image.findByIdAndUpdate(
        id,
        {
        image: {
                public_id: result.public_id,
                url: result.secure_url
            },
           userId
        },
        { new: true, runValidators: true }
      );
    
    return updatedImage;

}


const deleteImage = async (req, res) => {
    const { userId } = req.params;
    if (!userId || userId === "") {
        return res.status(403).json({ message: "Please login to continue" });
    }
    try {
        const image = await Image.findOneAndDelete({ userId });
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        cloudinary. uploader.destroy(image.image.public_id);        
        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    uploadImage,
    getImage,
    deleteImage
}
