"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary"


const populateUser = (query:any) => query.populate({
    path: "author",
    model: User,
    select:'_id firstName lastName clearkId'
})

// Add the image to database
export async function addImage( { image, userId, path } : AddImageParams ){
    try{
        await connectToDatabase();

        const author = await User.findById(userId)

        if(!author) throw new Error("User not found")

        const newImage = await Image.create({
            ...image,
            author: author._id

        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newImage))
    }
    catch(err){
        handleError(err)
    }
}


// update the image to database
export async function updateImage( { image, userId, path } : UpdateImageParams ){
    try{
        await connectToDatabase();

        const imageToUpdate = await Image.findById(image._id)

        if(!imageToUpdate || imageToUpdate.author.toHexString() !== userId) throw new Error("Image not found")

        const updatedImage = await Image.findByIdAndUpdate(
            imageToUpdate._id,
            image,
            { new: true }
        )

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedImage))
    }
    catch(err){
        handleError(err)
    }
}

// delete the image to database
export async function deleteImage( imageId:string ) {
    try{
        await connectToDatabase();

        await Image.findByIdAndDelete(imageId)

    }
    catch(err){
        handleError(err)
    } finally{
        redirect("/")
    }
}

// get image by id
export async function getImage( imageId:string ) {
    try{
        await connectToDatabase();

        const image = await populateUser(Image.findById(imageId))

        if(!image) throw new Error("Image not found")

        return JSON.parse(JSON.stringify(image))
    }
    catch(err){
        handleError(err)
    }
}

// Get All the Images
export async function getAllImage( { limit = 9, page=1, searchQuery = '' }:{
    limit?:number,
    page:number,
    searchQuery?:string
} ) {
    try{
        await connectToDatabase();

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        })

        let expression = 'folder=imagnary'

        if(searchQuery){
            expression += `AND ${searchQuery}`
        }

        const { resources } = await cloudinary.search.expression(expression).execute();

        const resourcesIds = resources.map((resource:any) => resource.public_id)
        
        let query = {}

        if(searchQuery){
            query = {
                publicId:{
                    $in : resourcesIds
                }
            }
        }

        const skipAmount = ( Number(page) -1) * limit;

        const images = await populateUser(
            Image.find(query)
            .sort({ createdAt: -1 })
            .skip(skipAmount)
            .limit(limit)
        )

        const totalImages = await Image.find(query).countDocuments()
        const savedImages = await Image.find().countDocuments();

        return{
            data: JSON.parse(JSON.stringify(images)),
            totalPages: Math.ceil(totalImages / limit),
            savedImages
        }

    }
    catch(err){
        handleError(err)
    }
}


// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

