import mongoose, { Schema, Document } from "mongoose";

export interface MenuDocument extends Document {
  name: string;
  description?: string;
  parentId?: mongoose.Types.ObjectId | null;
}

const MenuSchema = new Schema<MenuDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    parentId: {
      type: Schema.Types.ObjectId, 
      ref: "Menu",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<MenuDocument>("Menu", MenuSchema);