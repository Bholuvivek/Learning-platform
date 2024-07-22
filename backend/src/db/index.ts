import mongoose from 'mongoose';

const connectionDb =  async(): Promise<void>=>{
     await mongoose.connect('mongodb://localhost:27017/learning').then(() =>
        console.log('MongoDB connected')
    ).catch((err) => console.log(err));
    
}
export default connectionDb;
