
import express from 'express';

import db from '../models/customerService';

const router = express.Router();


router.post('/', (req, res) => {
    db.createCustomer(req, res);
});


// To add: a put request to update a book.
//

router.get('/', (req, res) => {
   db.readCustomers(req, res);
})

router.get('/:id', (req,res) => {
    
    db.readCustomer(req,res);

})

router.delete('/:id',(req, res) => {
 
  db.deleteCustomer(req, res);

})

router.put('/:id', (req, res) => {

  db.updateCustomer(req,res)
})

export default router;