const Accounts = require('./accounts-model');

function checkAccountPayload(req, res, next) {
    const error = { status: 400 };
    const { name, budget } = req.body;
    if (name === undefined || budget === undefined) {
      error.message = 'name and budget are required';
    } else if (typeof name !== 'string') {
      error.message = 'name of account must be a string';
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      error.message = 'name of account must be between 3 and 100';
    } else if (typeof budget !== 'number') {
      error.message = 'budget of account must be a number'
    } else if (budget < 0 || budget > 1000000) {
      error.message = 'budget of account is too large or too small';
    }
    if (error.message) {
      next(error);
    } else {
      next();
    }
}

async function checkAccountNameUnique(req, res, next) {
  try {
    const existingAccount = await Accounts.getByName(req.body.name);
    if (existingAccount) {
      next({ status: 400, message: "that name is taken"});
    } else {
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
      next({ status: 404, message: "account not found"})
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
