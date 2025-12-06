const { task } = require("hardhat/config");

task("deploy-fundme", "deploy and verify fundme contract").setAction(async(taskArgs, hre) => {
    //create contract
    const fundMeContract = await ethers.getContractFactory("FundMe");
    console.log("contract deploying...");
    //deploy contract
    const fundMe = await fundMeContract.deploy(100);
    await fundMe.waitForDeployment();
    console.log(`contract has been deployed successfully, contract address:${fundMe.target}`);
    //wait 1 blocks
    await fundMe.deploymentTransaction().wait(1) 
    await verifyFundMe(fundMe.target, [100])
});

module.exports = {};