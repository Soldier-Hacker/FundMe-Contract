# FundMe – 去中心化众筹合约 


合约使用 Chainlink Data Feed 获取 ETH/USD 价格，确保最小投资额（MINIMUM_VALUE）以及目标金额（TARGET）均以美元计算

## 🚀 技术栈（Tech Stack）
	•	Solidity ^0.8.20
	•	Hardhat
	•	Chainlink Data Feed（ETH/USD）
	•	ethers.js
    •。 javascript

## 项目说明
### 🔹 1. Fund 投资功能

	•	投资者可以在锁定期内向合约发送 ETH。
	•	最低投资额由 Chainlink 预言机计算为等值 100 USD。

### 🔹 2. 查看投资记录

	•	每个投资人对应自己的投资金额 fundersToAmount(address)

### 🔹 3. Withdraw（由项目方领取资金）

	•	锁定期结束
	•	合约总金额（按 USD 价格计算）达到目标值（TARGET = 1000 USD）
	•	只有 Owner 可以提款

### 🔹 4. Refund（投资人退款）

	•	锁定期结束
	•	合约总金额 低于 TARGET
	•	投资人可拿回自己的 ETH

### 🔹 5. 额外权限机制

	•	Owner 可设置一个 ERC20 合约地址，使其能更新基金记录。

## 测试网：sepolia

## 安装依赖

```npm install```

## 部署 Deploy
```npx hardhat run scripts/deploy.js --network sepolia```

## 运行集成测试
```npx hardhat test --network sepolia```

## 运行单元测试
```npx hardhat test```


