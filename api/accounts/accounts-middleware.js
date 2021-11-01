const Accounts = require('./accounts-model');
const accountsSchema = require('./accounts-schema');

async function checkAccountPayload(req, res, next) {
  try {
    const validAccount = await accountsSchema.validate(
      req.body
    );
    req.body = validAccount;
    next();
  } catch (err) {
    next(err);
  }
}

async function checkAccountNameUnique(req, res, next) {
  try {
    const newAccount = await Accounts.create({ name: req.body.name, budget: req.body.budget })
  } catch (err) {
    next(err);
  }
}

async function checkAccountId(req, res, next) {
  try {
    const potentialAccount = await Accounts.getById(req.params.id);
    if (!potentialAccount) {
      next({ status: 404, message: `Cannot find account at id ${req.params.id}`})
    } else {
      req.account = potentialAccount;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
}
