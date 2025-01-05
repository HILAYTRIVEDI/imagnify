import { Document,model, models, Schema } from 'mongoose'

// Declare the interface for the Image Schema
export interface IImage extends Document {
    title: string;
    transformation: string;
    publicId: string;
    secutedUrl: string;
    width?: number;
    height?: number;
    config?: object;
    transformationUrl?: URL;
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
    transformation:{
        type: String,
        required: true
    },
    publicId:{
        type: String,
        required: true
    },
    secutedUrl:{
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
    transformationUrl:{
        type: URL
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
    autor:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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