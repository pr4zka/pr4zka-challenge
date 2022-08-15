const { checkSchema } = require("express-validator");

const imageRequired = checkSchema({
  'imagen': {
      custom: {
          options: (value, { req }) => !!req.file,
          errorMessage: 'You should upload a file',
      },
  }
})

module.exports = {
  imageRequired,
};
