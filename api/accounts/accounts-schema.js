const yup = require('yup');

const accountsSchema = yup.object().shape({
    name: yup   
        .string('name of account must be a string')
        .required('name and budget are required')
        .trim()
        .min(3, 'name of account must be between 3 and 100'),
    budget: yup
        .number('budget of account must be a number')
        .required('name and budget are required')
        .min(0, 'budget of account is too large or too small')
        .max(1000000, 'budget of account is too large or too small'),
})

module.exports = accountsSchema;