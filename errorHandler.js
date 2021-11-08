function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code).send(err.message)
    console.log(err.message)
    return
  }
  res.status(500).json('something went wrong')
}

module.exports = errorHandler
