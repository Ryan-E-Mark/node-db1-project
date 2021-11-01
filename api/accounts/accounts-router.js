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

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({ 
      name: req.body.name.trim(), 
      budget: req.body.budget
    });
    req.newAccount = await Accounts.getById(newAccount);
    res.status(201).json(req.newAccount);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const potentialAccount = await Accounts.getById(req.params.id);
    if (!potentialAccount) {
      next({ status: 404, message: "account not found"});
    } else {
      const deletedAccount = await Accounts.deleteById(req.params.id);
      res.status(200).json({ message: "Deleted account successfully"});
    }
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { 
  res.status( err.status || 500).json({
    message: err.message,
    Prodmessage: "Something went terribly wrong!"
  })
})

module.exports = router;
