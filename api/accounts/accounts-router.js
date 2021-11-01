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

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  res.status(201).json(req.newAccount);
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const potentialAccount = await Accounts.getById(req.params.id);
    if (!potentialAccount) {
      next({ status: 404, message: "account not found"})
    } else {
      const deletedAccount = await Accounts.deleteById(req.params.id);
      res.status(200).json({ message: "Deleted account successfully"});
    }
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status( err.status || 500).json({
    message: err.message,
    Prodmessage: "Something went terribly wrong!"
  })
})

module.exports = router;
