function errorHandler(err, req, res, next) {
  res.status(err.code || 500).send(err.message)
  console.log(err.message)
  console.log('AHJHHHHHHHHHHH')
}

module.exports = errorHandler
