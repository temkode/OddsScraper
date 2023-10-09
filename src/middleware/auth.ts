import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send({
      success: false,
      error: 'Access denied. No token provided',
    });

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: 'Invalid Token',
    });
  }

  next();
};
