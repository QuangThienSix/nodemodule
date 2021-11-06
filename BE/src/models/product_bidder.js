import { load, add } from "../db";

const TBL_product_bidder = "product_bidder";


export const addproduct_bidder = async (entity) => {
  return await add(TBL_product_bidder, entity);
};


export const cancelproduct_bidder = async (id) => {
  const rows = await load(
    `update  ${TBL_product_bidder} set status = 0 where id = ${id}`
  );
  if (rows.length === 0) return null;
  return rows[0];
};





export const getproduct_bidder = async (product_id) => {
  const rows = await load(
    `select * from ${TBL_product_bidder} where product_id = ${product_id}`
  );
  if (rows.length === 0) return null;
  return rows;
};

