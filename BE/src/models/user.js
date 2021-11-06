import { load, add, patch } from "../db";

const TBL_USER = "users";

export const singleByUserName = async (username, password) => {
  const rows = await load(
    `select * from ${TBL_USER} where username = '${username}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
export const singleById = async (user_id) => {
  const rows = await load(
    `select * from ${TBL_USER} where user_id = '${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
export const updateRefreshToken = async (user_id, refreshToken) => {
  const rows = await load(
    `update ${TBL_USER} set refreshToken='${refreshToken}' where user_id='${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
export const isValidRefreshToken = async (user_id, rfToken) => {
  const rows = await load(
    `select * from ${TBL_USER} where rfToken = '${rfToken}' and user_id = '${user_id}'`
  );
  if (rows.length > 0) {
    return true;
  }
  return false;
};
export const addUser = async (entity) => {
  return await add(TBL_USER, entity);
};

export const singleByMail = async (email) => {
  const rows = await load(`select * from ${TBL_USER} where email = '${email}'`);
  if (rows.length === 0) return null;
  return rows[0];
};
export const updateIslock = async (user_id) => {
  const rows = await load(
    `update ${TBL_USER} set islock=0 , tokenMail='' where user_id='${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
export const listUser = async (name_like, role, _sort, _order) => {
  const rows = await load(
    `select address,email,fullname,islock,ratting,roles_id,user_id,username from ${TBL_USER} where (username like '%${name_like}%' or '${name_like}' = '' ) and (roles_id like '%${role}%' or '${role}' = '' ) ORDER BY ${_sort} ${_order}`
  );
  if (rows.length === 0) return null;
  return rows;
};
export const listUserId = async (user_id, name_like, role, _sort, _order) => {
  const rows = await load(
    `select address,email,fullname,islock,ratting,roles_id,user_id,username from ${TBL_USER} where user_id = '${user_id}' and (username like '%${name_like}%' or '${name_like}' = '' ) and (roles_id like '%${role}%' or '${role}' = '' ) ORDER BY ${_sort} ${_order}`
  );
  if (rows.length === 0) return null;
  return rows;
};

export const deleteUser = async (user_id) => {
  const rows = await load(
    `update ${TBL_USER} set islock='1' where user_id='${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};

export const updateUser = async (entity) => {
  const condition = {
    user_id: entity.user_id,
  };
  delete entity.user_id;
  return patch(TBL_USER, entity, condition);
};
export const updateUserId = async (entity) => {
  const condition = {
    user_id: entity.user_id,
  };
  delete entity.user_id;
  delete entity.accessToken;
  return patch(TBL_USER, entity, condition);
};
export const updateSellerUser = async (user_id) => {
  const rows = await load(
    `update ${TBL_USER} set role_id='3' where user_id='${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
export const updateBidderUser = async (user_id) => {
  const rows = await load(
    `update ${TBL_USER} set role_id='2' where user_id='${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
export const updatePassUser = async (user_id, password) => {
  const rows = await load(
    `update ${TBL_USER} set password=${password} where user_id='${user_id}'`
  );
  if (rows.length === 0) return null;
  return rows[0];
};
