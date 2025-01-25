import { Document,model, models, Schema } from 'mongoose'

// Declare the interface for the Image Schema
export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string;
    width?: number;
    height?: number;
    config?: object;
    transformationURL?: string;
    aspectRatio?: string;
    color?: string;
    promptUsed?: string;
    autor: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// Declare the Image Schema
const ImageSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    transformationType:{
        type: String,
        required: true
    },
    publicId:{
        type: String,
        required: true
    },
    secureURL:{
        type: String,
        required: true
    },
    width:{
        type: Number
    },
    height:{
        type: Number
    },
    config:{
        type: Object
    },
    transformationURL:{
        type: String
    },
    aspectRatio:{
        type: String
    },
    color:{
        type: String
    },
    promptUsed:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

// Construct the Image Model
const Image = models?.Image || model<IImage>('Image', ImageSchema)

export default Image