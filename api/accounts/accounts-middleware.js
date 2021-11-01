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
    const existingAccount = await Accounts.getByName(req.body.name);
    if (existingAccount) {
      next({ status: 400, message: "that name is taken"});
    } else {
      const newAccount = await Accounts.create(req.body).trim();
      req.newAccount = newAccount;
      next();
    }
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
