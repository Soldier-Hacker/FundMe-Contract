const { getNamedAccounts, deployments } = require("hardhat");
const { developmentChains, networkConfig, LOCK_TIME} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;

    let dataFeedAddr;
    if (developmentChains.includes(network.name)) {
        const mockV3Aggregator = await deployments.get("MockV3Aggregator");
        dataFeedAddr = mockV3Aggregator.address;
    } else {
        dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed;
    };
    
    await deploy("FundMe", {
        from: deployer,
        args: [LOCK_TIME, dataFeedAddr],
        log:true,
    });
};

module.exports.tags = ["all", "fundme"];