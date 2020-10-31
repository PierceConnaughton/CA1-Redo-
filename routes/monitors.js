
import express from 'express';

import db from '../models/monitorService';

const router = express.Router();


router.post('/', (req, res) => {
    db.createMonitor(req, res);
});


// To add: a put request to update a book.
//

router.get('/', (req, res) => {
   db.readMonitors(req, res);
})

router.get('/:id', (req,res) => {
    
    db.readMonitor(req,res);

})

router.delete('/:id',(req, res) => {
 
  db.deleteMonitor(req, res);

})

router.put('/:id', (req, res) => {

  db.updateMonitor(req,res)
})

export default router;