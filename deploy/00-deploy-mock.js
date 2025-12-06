const { DECIMAL, INITIAL_ANSWER, developmentChains } = require("../helper-hardhat-config");
const { getNamedAccounts, deployments } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  
  if (developmentChains.includes(network.name)) {
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    await deploy("MockV3Aggregator", {
      from: deployer,
      args: [DECIMAL, INITIAL_ANSWER],
      log: true,
    });
  } else {
    console.log(
      "environment is not local, mock contract deployment is skipped"
    );
  }
};

module.exports.tags = ["all", "mock"];
