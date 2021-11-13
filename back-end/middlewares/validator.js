exports.validatePhoneNumber = (req, res, next) => {
  // Supported formats - (123) 456 7899 , (123).456.7899 , (123)-456-7899 , 123-456-7899 , 123 456 7899 , 1234567899
  try {
    const { phoneNumber } = req.body
    const regex=/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    if (! String(phoneNumber).match(regex)) {
      throw { status: 400, messege: 'Phone Number must have only numbers or " - ". And should be in the appropriate phone numbers formats ' }
    } else {
      next()
    }
  } catch (error) {
    next({ status: error.status, messege: error.messege })
  }
}