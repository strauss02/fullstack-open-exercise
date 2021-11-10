function errorHandler(err, req, res, next) {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'UnknownReplWriteConcern') {
    return res
      .status(400)
      .send({ error: 'known server error. please ignore. the action was done' })
  }
  res.status(err.code >= 200 ? err.code : 500).send(err.message)
  console.log(err.message)
  console.log('AHJHHHHHHHHHHH')
  // next(err)
}

module.exports = errorHandler
