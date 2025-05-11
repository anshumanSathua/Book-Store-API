import mongoose, { Types, Document, Schema } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId;
  books: Types.ObjectId[];
  totalPrice: Number;
  purchasedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
