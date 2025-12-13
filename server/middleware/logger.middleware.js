const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path || req.url;
  
  console.log(`[${timestamp}] ${method} ${path}`);
  
  next();
};

export default logger;