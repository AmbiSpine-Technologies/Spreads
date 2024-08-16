
const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  
  
  const TryCatched = (passFun) => async (req, res, next) => {
    try {
      await passFun(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  
  export { errorMiddleware, TryCatched }
  