/*
 * @Author: ExpLife0011
 * @Date: 2022-04-23 13:53:53
 * @LastEditTime: 2022-04-23 18:16:03
 * @LastEditors: ExpLife0011
 * @Description:
 * @FilePath: /CrazyToken/migrations/1_initial_migration.js
 * MIT License
 */
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
