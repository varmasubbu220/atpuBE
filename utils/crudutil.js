
const handleAsyncError = (asyncFn) => async (req, res, next) => {
    try {
      await asyncFn(req, res, next);
    } catch (error) {
      console.error('Async function error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  module.exports = { handleAsyncError };
  