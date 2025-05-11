import mongoose, { Document, Schema } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  bio?: string;
  website?: string;
}

const authorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Author = mongoose.model<IAuthor>("Author", authorSchema);
export default Author;
