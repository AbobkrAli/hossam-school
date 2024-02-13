// import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d'
//   });
  
  // res.setHeader(
  //   "Set-Cookie",
  //   `jwt=${token}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=2592000` // Max-Age is equivalent to 30 days in seconds
  // );
// };

// export default generateToken;

import jwt from 'jsonwebtoken';

export const generateJWT = (userId, role) => {
  const payload = {
    userId,
    role
  };

  const options = {
    expiresIn: '30d' // Set token expiration time
  };

  // Sign the JWT token with a secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};
