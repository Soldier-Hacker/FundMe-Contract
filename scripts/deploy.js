const { ethers } = require("hardhat");

async function main() {
    //create contract
    const fundMeContract = await ethers.getContractFactory("FundMe");
    console.log("contract deploying...");
    //deploy contract
    const fundMe = await fundMeContract.deploy(100);
    await fundMe.waitForDeployment();
    console.log(`contract has been deployed successfully, contract address:${fundMe.target}`);
    //wait 1 blocks
    console.log("Waiting for 1 confirmations")
    await fundMe.deploymentTransaction().wait(1)    
    
    //init 2 accounts
    const [firstAccount, secondAccount] = await ethers.getSigners();

    //fund contract with first account
    const fundTx = await fundMe.fund({value: ethers.parseEther("0.05")});
    await fundTx.wait();
    
    //check balance of contract
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target);
    console.log(`Balance of the contract is ${balanceOfContract}`);

    //fund contract with second account
    const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0.05")});
    await fundTxWithSecondAccount.wait();

    //check balance of contract again
    const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target);
    console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`);

    //check mapping
    const firstAccountBalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address);
    console.log(`Balance of first account ${firstAccount.address} is ${firstAccountBalanceInFundMe}`);

    const secondAccountBalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address);
    console.log(`Balance of second account ${secondAccount.address} is ${secondAccountBalanceInFundMe}`);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });