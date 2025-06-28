# OP Stack Debugger

A Visual Studio Code extension that scans Solidity smart contracts and runs Hardhat tests on the Base Sepolia testnet.

## Installation
1. Install Node.js (v18.x.x or higher) and npm.
2. Install Hardhat: `npm install --save-dev hardhat`.
3. Configure MetaMask with the Base Sepolia network (RPC: https://sepolia.base.org).
4. Obtain testnet ETH from [Coinbase Developer Platform Faucet](https://faucet.developers.coinbase.com).
5. Install and activate the extension in VS Code.

## Dependencies
- hardhat: ^2.22.0
- @nomicfoundation/hardhat-toolbox: ^5.0.0
- ethers: ^6.14.0
- @openzeppelin/contracts: ^4.9.0

## Usage
1. Set up a Hardhat project in the `hardhat-project` directory.
2. In VS Code, open the Command Palette with `Ctrl+Shift+P` and run `OP Stack Debugger: Run Hardhat Tests`.
3. View test results in the Output tab (select "OP Stack Debugger").

## Sample Contracts
- `Lock.sol`: A contract for locking ETH with a time-based release mechanism.
- `TestToken.sol`: An ERC20 token built using OpenZeppelin standards.

## Features
- Scans Solidity contracts for basic syntax and structure.
- Executes Hardhat tests on Base Sepolia, displaying results in VS Code.
- Integrates with Hardhat to streamline testing for developers working on OP Stack-based projects.

## Contributing
Contributions are welcome! Please submit issues or pull requests to the [GitHub repository](<YOUR_GITHUB_REPO_URL>).

## License
MIT

/#/#/#
Explanation of the Extension's Functionality
The OP Stack Debugger is a Visual Studio Code extension designed to assist developers working with Solidity smart contracts on the Base Sepolia testnet, a Layer 2 scaling solution built on Ethereum using the OP Stack. Below is a concise explanation of what the extension does, tailored for clarity and suitable for inclusion in your Retro Funding 7 application.
What It Does
Scans Solidity Contracts: The extension analyzes Solidity files (e.g., Lock.sol and TestToken.sol) in the hardhat-project directory to ensure basic syntax and structure compliance, helping developers catch errors early.

Runs Hardhat Tests: It executes Hardhat test suites (e.g., Lock.js and TestToken.js) on the Base Sepolia testnet using the npx hardhat test --network baseSepolia command. Tests verify contract functionality, such as time-based ETH locking (Lock.sol) and ERC20 token operations (TestToken.sol).

Displays Results in VS Code: Test outputs are shown in the VS Code Output tab under "OP Stack Debugger," providing a seamless integration for developers to review results without leaving the editor.

Streamlines Development: By automating test execution within VS Code, it simplifies the workflow for developers building on Base or other OP Stack networks, reducing reliance on external terminals.

How It Works
Project Setup: The extension assumes a Hardhat project structure in C:\vscode-opstack-debugger\hardhat-project, with contracts (Lock.sol, TestToken.sol), tests (Lock.js, TestToken.js), and a configuration file (hardhat.config.js).

Command Execution: When the user runs the OP Stack Debugger: Run Hardhat Tests command via Ctrl+Shift+P, the extension triggers the hardhatRunner.ts script, which:
Locates the hardhat-project directory using the workspace configuration (opstack-debugger.code-workspace).

Executes npx hardhat test --network baseSepolia in the correct directory.

Captures and displays the test output (e.g., 7 passing tests for Lock and TestToken) in the VS Code Output tab.

Network Integration: Tests run on Base Sepolia, requiring testnet ETH for gas fees, which users can obtain from faucets like Coinbase Developer Platform Faucet.

Error Handling: The extension logs errors (e.g., network issues or test failures) in the Output tab, helping developers debug issues like insufficient ETH or RPC connectivity problems.

Why It’s Useful
Developer Productivity: Eliminates the need to switch between VS Code and a terminal for running Hardhat tests, saving time and improving workflow.

Base Sepolia Focus: Tailored for the Base ecosystem, making it valuable for developers building on OP Stack networks, especially for projects targeting Retro Funding 7.

Error Detection: Early scanning of Solidity code helps identify potential issues before deployment, enhancing code quality.

Community Contribution: As an open-source tool (MIT license), it supports the OP Stack and Base communities by providing a user-friendly testing interface.

Technical Details
Codebase: The extension uses TypeScript (hardhatRunner.ts) to interface with Hardhat, leveraging the child_process module to execute commands and vscode APIs to integrate with VS Code.

Dependencies: Relies on Hardhat (^2.22.0), @nomicfoundation/hardhat-toolbox (^5.0.0), ethers (^6.14.0), and @openzeppelin/contracts (^4.9.0) for contract development and testing.

Network: Configured for Base Sepolia (Chain ID: 84532, RPC: this website) with private keys in hardhat.config.js for deploying contracts.

Test Cases: Includes 7 tests (5 for Lock.sol, 2 for TestToken.sol) verifying functionalities like ETH locking, ownership, and token transfers, all passing on Base Sepolia.

