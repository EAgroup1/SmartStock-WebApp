import mongoose, { Schema, model } from 'mongoose';
export interface IFaq extends mongoose.Document {
    title: string,
    content: string,
    type: string
}


const lotSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    type: { type: String, required: true}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
export default model<IFaq>('Faq', lotSchema);
