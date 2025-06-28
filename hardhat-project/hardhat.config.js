require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // این خط بسیار مهمه

module.exports = {
  solidity: "0.8.28",
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC, // همینجا مقدار خونده میشه
      accounts: [
        process.env.PRIVATE_KEY1,
        process.env.PRIVATE_KEY2,
        process.env.PRIVATE_KEY3
      ].filter(Boolean),
      gasPrice: 500000000,
      gas: 2000000
    }
  }
};
