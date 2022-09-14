import Movie from './Movie'
import User from './User'
import mongoose, { Model, Mongoose } from 'mongoose'

interface dbs {
   movie: Model<{}, {}, {}, {}, {}>
}

export default dbs