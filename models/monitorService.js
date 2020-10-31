
import { Monitor } from "./monitorModel";


function readMonitors(req, res, options = []) {

    // this uses object deconstruction to extract the data from the query string
    // it is equivalent to writing
    // const title = req.query.title
    // const isbn = req.query.isbn
    // const limit = req.query.limit
    // const sum = req.query.sum

    const { brand, color, limit, sum } = req.query;
    let filter = {};

    if (brand) {

        filter.brand = { $regex: `^${brand}$`, $options: 'i' };
    }

    if (color) {

        filter.color = color
    }

    const limitNumber = parseInt(limit)

    Monitor.find(filter)
        .limit(limitNumber)
        .then((result) => {
            res.json(result)
        })
        .catch((error) =>
            res.status(500).json({ error: 'An error' + error }))


}

function readMonitor(req, res) {
    const id = req.params.id;
    Monitor.findById(id)
        .then((result) => {
            console.log('result' + result.uri);

            res.json(result)
        })
        .catch((error) =>
            res.status(404).json({ error: 'not found' }))
}


function createMonitor(req, res) {
    let monitorDoc = new Monitor(req.body);
    monitorDoc.save()
        .then((result) => {
            console.log('monitor saved');
            res.location(result.uri)
                .status(201)
                .json({ id: result._id, uri: result.uri })
        })
        .catch((error) => {
            res.status(412).json({ status: 'fail', message: 'not created' + error })
        });
    console.log('Promising to save');
}

function updateMonitor(req, res) {
    const id = req.params.id;

    console.log('updating monitor' + id)


    // note the syntax here. 
    // ...req.body - the three 
    Monitor.findByIdAndUpdate({_id: id}, {brand: 'Pierce\'s brand'}).
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

function deleteMonitor(req, res) {
    const id = req.params.id;

    Monitor.findByIdAndDelete(id).
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



export default { createMonitor, deleteMonitor, readMonitors, readMonitor, updateMonitor }
