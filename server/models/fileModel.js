import { Schema, model } from "mongoose";

const fileSchema = Schema({
    name: String,
    url: {
        type: String,
        required: true,
        unique: true
    },
    shorten_url: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const File = model('File', fileSchema);

export default File;