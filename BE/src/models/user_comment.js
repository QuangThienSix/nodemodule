import { load, add } from "../db";

const TBL_user_comment = "user_comment";


export const adduser_comment = async (entity) => {
  return await add(TBL_user_comment, entity);
};

export const getuser_comment = async (product_id) => {
  const rows = await load(
    `select * from ${TBL_user_comment} where product_id = ${product_id}`
  );
  if (rows.length === 0) return null;
  return rows;
};

