import mongoose, { Document, Schema } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const genreSchema = new Schema<IGenre>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model<IGenre>("Genre", genreSchema);
export default Genre;
