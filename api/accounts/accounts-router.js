const router = require('express').Router();
const Accounts = require('./accounts-model');
const { checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload 
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.status(200).json(req.account);
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status( err.status || 500).json({
    message: err.message,
    Prodmessage: "Something went terribly wrong!"
  })
})

module.exports = router;
