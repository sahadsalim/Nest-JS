import { Document } from "mongoose";


export interface ISample extends Document {

    readonly name: string;

    readonly id: number;
    readonly desc: string;
}