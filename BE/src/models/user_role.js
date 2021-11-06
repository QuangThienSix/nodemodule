import { load, add } from "../db";

const TBL_USER_ROLE = "user_roles";

export const getAll = async () => {
  const rows = await load(`select * from ${TBL_USER_ROLE}`);
  if (rows.length === 0) return null;
  return rows;
};
