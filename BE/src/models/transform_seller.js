import { load, add } from "../db";

const TBL_transform_seller = "transform_seller";


export const addtransform_seller = async (entity) => {
  return await add(TBL_transform_seller, entity);
};

export const gettransform_seller = async (page = 1 , size = 10) => {
  const rows = await load(
    `select * from ${TBL_transform_seller } Order By status desc LIMIT ${(page-1)*size} , ${size}`
  );
  if (rows.length === 0) return null;
  return rows;
};


export const activeTransform = async (id , active) => {
  const rows = await load(
    `UPDATE transform_seller set status = ${active} WHERE bidder_id = ${id}`
  );
  if (rows.length === 0) return null;
  return rows;
};

