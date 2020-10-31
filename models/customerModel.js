
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;


const CustomerSchema = new Schema(
    {
        customerID: { type: String, required: true, index :{unique: true} },
        firstName: { type: String, required: true},
        lastName: { type: String, required: true },
        address1: {type: String, required: true},
        address2: { type: String},
        mobileNumber: { type: Number, required: true },
    },
    { toJSON: { virtuals: true } }) // include virtuals when document is converted to JSON


CustomerSchema.virtual('uri').get(function()  {
    return `/customers/${this._id}` ;
});

CustomerSchema.plugin(uniqueValidator);

let Customer = mongoose.model('Customer', CustomerSchema);


export { Customer }