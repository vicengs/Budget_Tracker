/* ------------------------- */
/* Project  : Budget Tracker */
/* File     : server.js      */
/* Modify   : Vicente Garcia */
/* Date     : 06/16/2022     */
/* Modified : 06/16/2022     */
/* ------------------------- */
const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// Add route to delete and be able to test many times
router.delete("/api/transaction/:id", ({params}, res) => {
  Transaction.findOneAndDelete({ _id: params.id })
  .then(dbTransactionData => {
    if (!dbTransactionData) {
        res.status(404).json({ message: "No transaction found with this id!" });
        return;
    }
    res.json(dbTransactionData);
  })
  .catch(err => {
    res.status(404).json(err);
  });
});

module.exports = router;