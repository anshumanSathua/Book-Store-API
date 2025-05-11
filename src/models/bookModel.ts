import mongoose, { Schema, Types, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  description?: string;
  author: Types.ObjectId;
  genres: Types.ObjectId[];
  price: number;
  coverImage?: string;
  publishedYear?: number;
  createdBy: Types.ObjectId;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    coverImage: {
      type: String,
    },
    publishedYear: {
      type: Number,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
