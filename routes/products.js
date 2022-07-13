const express = require('express');
const router = express.Router();
const products = require('../services/products');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getData());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await products.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await products.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await products.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});
module.exports = router;