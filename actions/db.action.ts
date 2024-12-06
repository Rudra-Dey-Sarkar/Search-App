"use server";
import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  tags: { type: [String], required: true },
},
{ collection: "collection" });

export const collection = mongoose.models.collection || mongoose.model("collection", blogModel);
