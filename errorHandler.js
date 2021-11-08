function errorHandler(err, req, res, next) {
  res.status(err.code).send(err.message)
  console.log(err.message)
  console.log('AHJHHHHHHHHHHH')
}

module.exports = errorHandler
