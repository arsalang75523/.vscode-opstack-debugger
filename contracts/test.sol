// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "TST") {
        _mint(msg.sender, 1000000 * 10**18);
    }
    function riskyMath(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b; // Potential overflow risk
    }
}