import { load, add } from "../db";

const TBL_watch_list = "watch_list";


export const addwatch_list = async (entity) => {
  return await add(TBL_watch_list, entity);
};
export const deletewatch_list = async (entity) => {
  return await delete(TBL_watch_list, entity);
};


export const getwatch_list = async (bidder_id) => {
  const rows = await load(
    `select * from ${TBL_watch_list} where bidder_id = ${bidder_id}`
  );
  if (rows.length === 0) return null;
  return rows;
};

