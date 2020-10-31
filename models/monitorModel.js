
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;


const MonitorSchema = new Schema(
    {
        brand: { type: String, required: true },
        monitorID: {type: String, required: true, index :{unique: true}},
        size: { type: Number, required: true },
        version: {type: String, required: true},
        color: { type: String, required: true },
        refreshRate: { type: String},
    },
    { toJSON: { virtuals: true } }) // include virtuals when document is converted to JSON


// this creates a get property uri which can be used but does not
// get stpred om the database

MonitorSchema.virtual('uri').get(function()  {
    return `/monitors/${this._id}` ;
});

MonitorSchema.plugin(uniqueValidator);

let Monitor = mongoose.model('Monitor', MonitorSchema);


export { Monitor }