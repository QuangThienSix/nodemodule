import { logger } from "../lib/utils";
import { verifyTokenForUser } from "../lib/utils";
import { formatResponseSuccess, formatResponseError } from "../lib/utils";
export const authMdw = function (req, res, next) {
  const accessToken = req.headers["x-access-token"];
  logger.info("x-access-token: " + accessToken)
  if (accessToken) {
    try {
      const decoded = verifyTokenForUser(accessToken);
      req.accessTokenPayload = decoded;
      next();
    } catch (err) {
      logger.info("MDW auth: ", err);
      return formatResponseError(res, "Invalid access token.", 401);
    }
  } else {
    logger.info("MDW no accessToken: ");
    return formatResponseSuccess(res, {}, "Access token not found.", 400);
  }
};
