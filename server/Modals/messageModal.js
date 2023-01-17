import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const messageModal = mongoose.model("Message", messageSchema);

export default messageModal;