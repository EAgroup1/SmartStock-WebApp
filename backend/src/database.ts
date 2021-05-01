import mongoose from 'mongoose';
import { mongodb } from './keys';

//SmartStockDB = Project's database (originally empty)

mongoose.connect(mongodb.URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log("DB is connected!")) //if we connect correctly
.catch(err => console.error(err)); //elif (we don't connect correctly)

//we will export
export default mongoose;
