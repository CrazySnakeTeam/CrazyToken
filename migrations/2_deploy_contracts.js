/*
 * @Author: ExpLife0011
 * @Date: 2022-04-23 18:15:59
 * @LastEditTime: 2022-04-27 11:45:35
 * @LastEditors: ExpLife0011
 * @Description: Deploy CrazyToken and Vesting contract.
 * @FilePath: \CrazyToken\migrations\2_deploy_contracts.js
 * MIT License
 */

const CrazyToken = artifacts.require("CrazyToken");

module.exports = function (deployer) {
  deployer.deploy(CrazyToken);
};