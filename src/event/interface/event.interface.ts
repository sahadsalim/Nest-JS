
export interface IEvent extends Document {

    readonly name: string;
    readonly id: number;
    readonly image: string;
    readonly date:string;
    readonly place:Date;
}