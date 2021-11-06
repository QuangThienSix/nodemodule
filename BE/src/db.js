import appConfig from "./config/env";
import { logger } from "./lib/utils";
import mysql from "mysql";
const pool = mysql.createPool(appConfig.mysql);
export default (init) => {
  // connect to db
  try {
    pool.getConnection(function (err, connection) {
      if (connection) {
        logger.info("DB connected.");
      } else {
        logger.info("No conncet err: ", err.sqlMessage);
      }
    });
    init();
  } catch (error) {
    logger.info("DB disconnect.");
  }
};

export const load = (sql) => {
  return new Promise(function (resolve, reject) {
    pool.query(sql, function (error, results, fields) {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
};
export const add = (table, entity) => {
  return new Promise(function (resolve, reject) {
    const sql = `insert into ${table} set ?`;
    pool.query(sql, entity, function (error, results) {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};
export const getNow =()=> {
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}
export const patch = (table, entity, condition) => {
  return new Promise(function (resolve, reject) {
    const sql = `update ${table} set ? where ?`;
    pool.query(sql, [entity, condition], function (error, results) {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

export const del = (table, condition) => {
  return new Promise(function (resolve, reject) {
    const sql = `delete from ${table} where ?`;
    pool.query(sql, condition, function (error, results) {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};
