/*
 * @Author: ExpLife0011
 * @Date: 2022-04-26 16:46:34
 * @LastEditTime: 2022-04-27 01:11:27
 * @LastEditors: ExpLife0011
 * @Description: Test CrazyToken contract
 * @FilePath: /CrazyToken/test/CrazyToken.test.js
 * MIT License
 */

const CrazyToken = artifacts.require("CrazyToken");
const {
    constants,
    expectEvent,
    expectRevert
} = require("@openzeppelin/test-helpers");

contract("CrazyToken", (accounts) => {

    this.deployer = accounts[0];
    this.user1 = accounts[1];
    this.user2 = accounts[2];
    this.user3 = accounts[3];
    this.user4 = accounts[4];
    this.user5 = accounts[5];

    beforeEach("Setup contract for each test", async () => {
        this.symbolName = "$Crazy";
        this.tokenName = "Crazy Token";

        this.totalSupply = web3.utils.toBN('1000000000000000000000000000');
        this.ExpectedTokensAmountOfVesting = web3.utils.toBN('400000000000000000000000000');
        this.ExpectedTokensAmountOfMining = web3.utils.toBN('400000000000000000000000000');
        this.ExpectedTokensAmountOfInGameReward = web3.utils.toBN('100000000000000000000000000');
        this.ExpectedTokensAmountOfEcosystemGrowth = web3.utils.toBN('50000000000000000000000000');
        this.ExpectedTokensAmountOfMarketing = web3.utils.toBN('50000000000000000000000000');
        this.crazyTokenInstance = await CrazyToken.new();
    })

    describe("Initial deployment", () => {
        describe("totalSupply", () => {
            it("returns correct total supply", async () => {
                expect(await this.crazyTokenInstance.totalSupply()).to.eql(this.totalSupply);
            })
        })

        describe("name", () => {
            it("returns correct token name", async () => {
                expect(await this.crazyTokenInstance.name()).to.eql(this.tokenName);
            })
        })

        describe("symbol", () => {
            it("returns correct symbol name", async () => {
                expect(await this.crazyTokenInstance.symbol()).to.eql(this.symbolName);
            })
        })
    })

    describe("Init balance", () => {
        describe("all tokens in contract", () => {
            it("returns the total amount of tokens", async () => {
                expect(await this.crazyTokenInstance.balanceOf(this.crazyTokenInstance.address)).to.eql(this.totalSupply);
            })
        })

        describe("deployer has no tokens", () => {
            it("returns zero", async () => {
                expect(await this.crazyTokenInstance.balanceOf(this.deployer)).to.eql(web3.utils.toBN(0));
            })
        })

        describe("user1 has no tokens", () => {
            it("returns zero", async () => {
                expect(await this.crazyTokenInstance.balanceOf(this.user1)).to.eql(web3.utils.toBN(0));
            })
        })
    })

    describe("Tokenomics", () => {
        describe("invoke tokenomics interfaces", () => {
            it("transfer to vesting, returns the correct amount of tokens", async () => {
                await this.crazyTokenInstance.transferToVesting(this.user1, { from: this.deployer });
                console.log((await this.crazyTokenInstance.balanceOf(this.user1)).toString());
                expect(await this.crazyTokenInstance.balanceOf(this.user1)).to.eql(this.ExpectedTokensAmountOfVesting);
            })

            it("transfer to mining, returns the correct amount of tokens", async () => {
                await this.crazyTokenInstance.transferToMining(this.user2, { from: this.deployer });
                console.log((await this.crazyTokenInstance.balanceOf(this.user2)).toString());
                expect(await this.crazyTokenInstance.balanceOf(this.user2)).to.eql(this.ExpectedTokensAmountOfMining);
            })

            it("transfer to inGameReward, returns the correct amount of tokens", async () => {
                await this.crazyTokenInstance.transferToVaultInGameReward(this.user3, { from: this.deployer });
                console.log((await this.crazyTokenInstance.balanceOf(this.user3)).toString());
                expect(await this.crazyTokenInstance.balanceOf(this.user3)).to.eql(this.ExpectedTokensAmountOfInGameReward);
            })

            it("transfer to ecosystemGrowth, returns the correct amount of tokens", async () => {
                await this.crazyTokenInstance.transferToEcosystemGrowth(this.user4, { from: this.deployer });
                console.log((await this.crazyTokenInstance.balanceOf(this.user4)).toString());
                expect(await this.crazyTokenInstance.balanceOf(this.user4)).to.eql(this.ExpectedTokensAmountOfEcosystemGrowth);
            })

            it("transfer to marketing, returns the correct amount of tokens", async () => {
                await this.crazyTokenInstance.transferToMarketing(this.user5, { from: this.deployer });
                console.log((await this.crazyTokenInstance.balanceOf(this.user5)).toString());
                expect(await this.crazyTokenInstance.balanceOf(this.user5)).to.eql(this.ExpectedTokensAmountOfMarketing);
            })

            it("emits a Transfer event on successful transfers", async () => {
                const receipt = await this.crazyTokenInstance.transferToVesting(this.user1, { from: this.deployer });

                expectEvent(receipt, 'Transfer', {
                    from: this.crazyTokenInstance.address,
                    to: this.user1,
                    value: this.ExpectedTokensAmountOfVesting
                })
            })
        })

        describe("invoke tokenomics interfaces twice", async () => {
            it("reverts when invoke transferToVesting the second time", async () => {
                await this.crazyTokenInstance.transferToVesting(this.user1, { from: this.deployer });
                await expectRevert(this.crazyTokenInstance.transferToVesting(this.user1, { from: this.deployer }),
                    "Already transferred");
            })
        })
    })

    describe("Transfer", () => {
        describe("normal transfers", () => {
            it("transfers among deployer, user1", async () => {
                await this.crazyTokenInstance.transferToVesting(this.user1, { from: this.deployer });
                expect(await this.crazyTokenInstance.balanceOf(this.user1)).to.eql(this.ExpectedTokensAmountOfVesting);
                expect(await this.crazyTokenInstance.balanceOf(this.deployer)).to.eql(web3.utils.toBN(0));

                await this.crazyTokenInstance.transfer(this.deployer, this.ExpectedTokensAmountOfVesting, {from: this.user1});
                expect(await this.crazyTokenInstance.balanceOf(this.deployer)).to.eql(this.ExpectedTokensAmountOfVesting);
                expect(await this.crazyTokenInstance.balanceOf(this.user1)).to.eql(web3.utils.toBN(0));
            })
        })

        describe("abnormal transfers", () => {
            it("reverts when transferring tokens to the zero address", async () => {
                await expectRevert(
                    this.crazyTokenInstance.transfer(constants.ZERO_ADDRESS, web3.utils.toBN(1), {from: this.deployer}),
                    "ERC20: transfer to the zero address"
                );
            })
        })
    })
});