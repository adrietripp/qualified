function validateZip(req, res, next) {
  const { zip } = req.params;

  if (zip && zip.length === 5 && /^[0-9]+$/.test(zip)) {
    next(); 
  } else if (!zip) {
    next(); 
  } else {
    next(new Error(`Zip (${zip}) is invalid!`));
  }
}

module.exports = validateZip;





