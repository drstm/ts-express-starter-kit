import config from 'config'
import mysql from "mysql";
/**
* Creates a MySQL database connection pool
*/
  export interface DbResult {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number 
  }

  export const mysqlDb = mysql.createPool({
    connectionLimit: config.get("mysql.pool"),
    dateStrings: config.get("mysql.dateStrings"),
    debug: config.get("mysql.debug"),
    host: config.get("mysql.host"),
    port: config.get("mysql.port"),
    user: config.get("mysql.username"),
    password: config.get("mysql.password"),
    database: config.get("mysql.database")
  });
  
  // Test the connection mysqlDb.getConnection(function (err, connection) {   if
  // (err) {     console.log('MySQL database connection error', err.message);   }
  //  if (!err) {     console.log('MySQL database connection established', 'Thread
  // ID' + connection.threadId);     connection.release();   }
  
  /**
  * Rebuilds a MySQL query that contains placeholders
  *
  * @param sql
  * @param params
  * @returns {string}
  */
  export const debug = function (sql: any, params: any) {
    if (sql.indexOf('?') >= 0) {
      let matches = sql
        .match(/\?/g)
        .length;
  
      for (let i = 0; i <= matches; i++) {
        sql = sql.replace(/\?/, '"' + params[i] + '"')
      }
    }
  
    return sql
  };
  
  /**
  * Executes a MySQL query
  *
  * @param sql
  * @param params
  * @param callback
  */
  export const query = function (sql: any, params?: any) {
  
    return new Promise((resolve, reject) => {
  
      mysqlDb
        .getConnection(function (err, connection) {
          if (err) {
  
            reject(err.message);
          }
  
          connection
            .query(sql, params, function (err, rows) {
              if (err) {
                var error = {
                  code: 'Internal Server Error',
                  title: 'Database Query Error',
                  detail: err.message
                };
  
                reject(error);
              }
  
              if (!err) {
                resolve(rows);
              }
            });
          connection.release();
        });
    });
  };

