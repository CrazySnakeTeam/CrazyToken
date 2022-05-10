/*
 * @Author: ExpLife0011
 * @Date: 2022-04-23 16:31:42
 * @LastEditTime: 2022-05-10 18:08:33
 * @LastEditors: ExpLife0011
 * @Description: Token contract for CrazySnake game
 * @FilePath: /CrazyToken/contracts/CrazyToken.sol
 * MIT License
 */

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/hardhat/console.sol";

contract CrazyToken is ERC20PresetMinterPauser, Ownable {
    using SafeMath for uint256;

    uint256 private constant INITIAL_SUPPLY = 1_000_000_000e18;
    bool public vestingTransferDone;
    bool public miningTransferDone;
    bool public inGameRewardTransferDone;
    bool public ecosystemGrowthTransferDone;
    bool public marketingTransferDone;

    /**
     * @dev Constructor of the contract.
     * @notice Initialize token's name and symbol.
     */
    constructor() ERC20PresetMinterPauser("Crazy Token", "$Crazy")
    {
        _mint(address(this), INITIAL_SUPPLY);
    }

    /**
     * @dev Transfer tokens to vesting contract.
     * @param _vestingAddress Contract address where tokens for vesting.
     * to send (40% of total supply).
     */
    function transferToVesting(address _vestingAddress) external onlyOwner
    {
        require(_vestingAddress != address(0), "Can not transfer to the zero address");
        require(!vestingTransferDone, "Already transferred");
        _transfer(address(this), _vestingAddress, INITIAL_SUPPLY.mul(40).div(100));
        vestingTransferDone = true;
    }

    /**
     * @dev Transfer tokens to vault for mining.
     * @param _miningAddress Vault address where tokens for mining.
     * to send (40% of total supply).
     */
    function transferToMining(address _miningAddress) external onlyOwner
    {
        require(_miningAddress != address(0), "Can not transfer to the zero address");
        require(!miningTransferDone, "Already transferred");
        _transfer(address(this), _miningAddress, INITIAL_SUPPLY.mul(40).div(100));
        miningTransferDone = true;
    }

    /**
     * @dev Transfer tokens to vault for in game reward.
     * @param _inGameRewardAddress Vault address where tokens for inGameReward.
     * to send (10% of total supply).
     */
    function transferToVaultInGameReward(address _inGameRewardAddress) external onlyOwner {
        require(_inGameRewardAddress != address(0), "Can not transfer to the zero address");
        require(!inGameRewardTransferDone, "Already transferred");
        _transfer(address(this), _inGameRewardAddress, INITIAL_SUPPLY.mul(10).div(100));
        inGameRewardTransferDone = true;
    }

    /**
     * @dev Transfer tokens to vault for ecosystemGrowth.
     * @param _ecosystemGrowthAddress vault address where tokens for ecosystemGrowth.
     * to send (5% of total supply).
     */
    function transferToEcosystemGrowth(address _ecosystemGrowthAddress) external onlyOwner {
        require(_ecosystemGrowthAddress != address(0), "Can not transfer to the zero address");
        require(!ecosystemGrowthTransferDone, "Already transferred");
        _transfer(address(this), _ecosystemGrowthAddress, INITIAL_SUPPLY.mul(5).div(100));
        ecosystemGrowthTransferDone = true;
    }

    /**
     * @dev Transfer tokens to marketing contract.
     * @param _marketingAddress Contract address where tokens for marketing.
     * to send (5% of total supply).
     */
    function transferToMarketing(address _marketingAddress) external onlyOwner {
        require(_marketingAddress != address(0), "Can not transfer to the zero address");
        require(!marketingTransferDone, "Already transferred");
        _transfer(address(this), _marketingAddress, INITIAL_SUPPLY.mul(5).div(100));
        marketingTransferDone = true;
    }
}