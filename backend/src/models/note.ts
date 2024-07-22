import mongoose, { Document, Schema } from 'mongoose';

interface Note extends Document {
    title: string;
    note: string;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    note: { type: String, required: true }
});

const Notes = mongoose.model<Note>('Notes', NoteSchema);

export default Notes;
