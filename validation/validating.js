const { user } = require('./validation');

module.exports = {
  addUserValidation: async (req, res, next) => {
    const value = await user.validate(req.body);
    if (value.error) {
      res.json({
        success: '0',
        message: 'Value error',
      });
    } else {
      next();
    }
  },
};
