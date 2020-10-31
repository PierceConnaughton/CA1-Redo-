
import { Customer } from "./customerModel";


function readCustomers(req, res, options = []) {

    // this uses object deconstruction to extract the data from the query string
    // it is equivalent to writing
    // const title = req.query.title
    // const isbn = req.query.isbn
    // const limit = req.query.limit
    // const sum = req.query.sum

    const { firstName, secondName,address1,mobileNumber ,limit, sum } = req.query;
    let filter = {};

    if (firstName) {

        filter.brand = { $regex: `^${firstName}$`, $options: 'i' };
    }

    if (secondName) {

        filter.secondName = secondName
    }
    if (address1) {

        filter.address1 = address1
    }
    if (mobileNumber) {

        filter.mobileNumber = mobileNumber
    }

    const limitNumber = parseInt(limit)

    Customer.find(filter)
        .limit(limitNumber)
        .then((result) => {
            res.json(result)
        })
        .catch((error) =>
            res.status(500).json({ error: 'An error' + error }))


}

function readCustomer(req, res) {
    const id = req.params.id;
    Customer.findById(id)
        .then((result) => {
            console.log('result' + result.uri);

            res.json(result)
        })
        .catch((error) =>
            res.status(404).json({ error: 'not found' }))
}


function createCustomer(req, res) {
    let customerDoc = new Customer(req.body);
    customerDoc.save()
        .then((result) => {
            console.log('customer saved');
            res.location(result.uri)
                .status(201)
                .json({ id: result._id, uri: result.uri })
        })
        .catch((error) => {
            res.status(412).json({ status: 'fail', message: 'not created' + error })
        });
    console.log('Promising to save');
}

function updateCustomer(req, res) {
    const id = req.params.id;

    console.log('updating customer' + id)


    // note the syntax here. 
    // ...req.body - the three 
    Customer.findByIdAndUpdate({_id: id}, {address2: 'Updated Address'}).
    then((result) => {
        if (result) {
            res.status(200).send({ message: 'updated' })
            M
        }
        else {
            res.status(404).send({ message: 'not found' })
        }
    })
    .catch((error) =>
        res.status(404).send({ message: 'not found' + error }));

}

function deleteCustomer(req, res) {
    const id = req.params.id;

    Customer.findByIdAndDelete(id).
        then((result) => {
            if (result) {
                res.status(203).send({ message: 'deleted' })
            }
            else {
                res.status(404).send({ message: 'not found' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' + error }));
}



export default { createCustomer, deleteCustomer, readCustomers, readCustomer, updateCustomer }
