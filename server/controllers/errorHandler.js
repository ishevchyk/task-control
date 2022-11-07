const errorHandler = (err, req, res, next) => {
  try {
    if(err.name === 'ValidationError') return err = handleValidationError(err, res);
    if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
    if(err.message) return err = handleCustomError(err, res)

  } catch (err){
    res.status(500).send('Server error')
  }
}

const handleValidationError = (err, res) => {
  let error = Object.values(err.errors).map(el => el.message);
  if(error.length > 1) {
    console.log(error)
    const formattedErrors = error.join(' ');
    console.log(formattedErrors)
    res.status(400).send({formattedErrors});
  } else {
    res.status(400).send({error})
  }
}

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const error = `An account with that ${field} already exists.`;
  res.status(409).send(error);
}

const handleCustomError = (err, res) => {
  const error = err.message;
  res.status(400).send(
    error
  )
}


module.exports = {
  errorHandler
}
