module.exports = {
    check: (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    // IF no auth headers are provided
    // THEN return 401 Unauthorized error
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Auth headers not provided in the request.'
        }
      });
    }
}
}