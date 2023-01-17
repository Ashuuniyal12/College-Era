import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    members: {
        type: Array,
    },
}, {
    timestamps: true,
});

const chatModal = mongoose.model('chat', chatSchema);

export default chatModal;