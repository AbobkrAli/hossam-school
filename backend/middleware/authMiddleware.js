import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler'

export const protectAdmin = AsyncHandler(async(req, res, next) =>{
    
  const { jwt: token } = req.cookies
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role == 'admin'){
      next()
    }
    
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
})




export const protectUser = AsyncHandler(async(req, res, next) =>{
    
  const { jwt: token } = req.cookies
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role == 'user'){
      next()
    }
    
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
})



// Middleware to verify JWT token and extract user role
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    
    // Extract role claim from decoded JWT payload
    req.userRole = decoded.role;
    req.userId = decoded.id
    next();
  });
};

// Example usage in route handler
export const verifyJWTFromCookie = (req) => {
  const token = req.cookies.jwt; // Assuming token is stored in a cookie named "token"
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return {role: decoded.role, userId: decoded.userId}; // Return the role from the decoded token
    } catch (err) {
      console.error('Error decoding token:', err.message);
      return null; // Return null if token is invalid or expired
    }
  } else {
    return null; // Return null if token is not found in cookies
  }
};



export const signOut = AsyncHandler(async(req, res, next) =>{
  res.setHeader(
    "Set-Cookie",
    `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=None`
  ).send('done clearing the token')
})


