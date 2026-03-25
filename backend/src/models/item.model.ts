import mongoose, { Schema, Document } from "mongoose";

export interface ItemDocument extends Document {
  name: string;
  price: number;
  menuId: mongoose.Types.ObjectId;
}

const itemSchema = new Schema<ItemDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    menuId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ItemDocument>("Item", itemSchema);