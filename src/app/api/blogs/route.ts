"use server";

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { collection } from "../../../../actions/db.action";

const DB_KEY = process.env.DB_CONNECTION_KEY!;

export async function GET() {
    let data: any;
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(DB_KEY);

            console.log("Connected to database:", mongoose?.connection?.db?.databaseName);
        }

        // Fetch all blog documents
        data = await collection.find({});
    } catch (error) {
        console.error("Database connection error:", error);
        data = { success: false }
    }

    return NextResponse.json(data);
}
