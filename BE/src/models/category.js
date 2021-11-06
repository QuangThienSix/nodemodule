import { load, add } from "../db";

const TBL_CATEGORY = "category";

export const singleByCategoryName = async (id) => {
  const rows = await load(
    `select * from ${TBL_CATEGORY} where id = '${id}'  and is_deleted =  '0'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};

export const addCateroy = async (entity) => {
  return await add(TBL_CATEGORY, entity);
};
export const updateCateroy = async (entity) => {
  return await update(TBL_CATEGORY, entity);
};

export const deleteCateroy = async (id) => {
  const rows = await load(
    `update ${TBL_CATEGORY} set is_deleted='1' where id='${id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};

export const getCateroy = async () => {
  const rows = await load(
    `SELECT a.* , 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', b.name, 'id', b.id)) from brand b WHERE b.category_id = a.id and b.is_deleted = 0) as 'brands'
    FROM ${TBL_CATEGORY} a
    WHERE a.is_deleted = 0`
  );
  if (rows.length === 0) return null;
  return rows;
};

