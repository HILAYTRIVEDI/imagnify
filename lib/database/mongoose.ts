// File to create connection with MongoDB using mongoose
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Cached connection promise
let cached: MongooseConnection = ( global as any ).mongoose

// If the connection is not cached set the connection and promise to null
if (!cached) {
    cached = ( global as any ).mongoose = { connection: null, promise: null }
}

/**
 * This function creates a connection with MongoDB using mongoose and check 
 * if the connection is already cached or not. If the connection is already
 * cached then it returns the connection otherwise it creates a new connection
 * and returns it. If the MONGODB_URL is not defined in the environment variable
 * then it throws an error. If the connection is not cached then it sets the
 * connection and returns the connection.
 * 
 * @returns Mongoose connection
 */
export const connectToDatabase = async () => {

    // If the connection is already cached return the connection
    if (cached.connection) {
        return cached.connection
    }

    if( !MONGODB_URL ) {
        throw new Error('Please define the MONGODB_URL environment variable inside .env.local')
    }

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'imagnify',
        bufferCommands: false,
    })

    cached.connection = await cached.promise

    return cached.connection
}