import jwt from "jsonwebtoken";
import apiConfig from "../../config/api";

/**
 * Token For User
 * Sets a token based on user id and
 * secret key
 *
 * @param {object} user - user data
 * @returns token
 */

export const getTokenForUser = (user) => {
  const timestamp = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      user_id: user.user_id,
      roles_id: user.roles_id,
      user_name:user.user_name,
      fullname:user.fullname,
      iat: timestamp,
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes
    },
    apiConfig.secretKey
  );
};
export const deCodeTokenForUser = (token) => {
  const decoded = jwt.decode(token, {
    complete: true,
  });
  return decoded;
};
export const verifyTokenForUser = (token) => {
  const decoded = jwt.verify(token, apiConfig.secretKey);
  return decoded;
};
