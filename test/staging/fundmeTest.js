const { assert, expect } = require("chai");
const { getNamedAccounts, ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { developmentChains} = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
? describe.skip
: describe("test fundme contract", async function() {
    let fundMe;
    let deployer;
    beforeEach(async function (){
        await deployments.fixture(["all"]);
        deployer = (await getNamedAccounts()).deployer;
        const fundMeDeployment = await deployments.get("FundMe");
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address);
    });

    it("fund and getFund successfully",
        async function() {
            await fundMe.fund({ value: ethers.parseEther("0.5")});
            await new Promise(resolve => setTimeout(resolve, 181 * 1000));
            const getFundTx = await fundMe.getFund();
            const getFundMReceipt = await getFundTx.wait(); 
            expect(getFundMReceipt)
                .to.be.emit(fundMe, "FundWithdrawByOwner")
                .withArgs(ethers.parseEther("0.5"));
        }
    );
    it("fund and refund successfully",
        async function() {
            await fundMe.fund({ value: ethers.parseEther("0.1")});
            await new Promise(resolve => setTimeout(resolve, 181 * 1000));
            const refundTx = await fundMe.refund();
            const refundMReceipt = await refundTx.wait(); 
            expect(refundMReceipt)
                .to.be.emit(fundMe, "RefundByFunder")
                .withArgs(deployer, ethers.parseEther("0.1"));
        }
    );    
});