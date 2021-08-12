//SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

/// @title The contract title release 0.0.4
/// @author The contract author
/// @notice The contract notice with some description
/// @dev The contract dev comments
contract NatSpecExample {
    /// @notice Received Event notice with some description
    /// @dev Received Event dev comments
    event Received(address, uint);

    /// @notice Fallback Event notice with some description
    /// @dev Fallback Event dev comments
    event Fallback(address, uint);

    /// @notice receive notice with some description
    /// @dev receive dev comments
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }


    /// @notice fallback notice with some description
    /// @dev fallback dev comments
    fallback() external payable {
        emit Fallback(msg.sender, msg.value);
    }

    /// @notice somePublicVariable notice with some description
    /// @dev somePublicVariable dev comments
    /// @return somePublicVariable return value
    uint256 public somePublicVariable;

    /// @notice constructor notice with some description
    /// @dev constructor dev comments
    constructor() {
        somePublicVariable = 10;
    }


    /// @notice someMethod1 notice
    /// @dev someMethod1 dev comment
    /// @param someInput someMethod1 someInput param
    /// @return ret1 someMethod1 ret1
    /// @return ret2 someMethod1 ret2
    function someMethod1(uint256 someInput) external pure returns (uint256 ret1, address ret2) {
        return (someInput, address(2));
    }


    /// @notice someMethod2 notice
    /// @dev someMethod2 dev comment
    /// @param someInput someMethod2 someInput param
    /// @return someMethod2 ret1
    /// @return someMethod2 ret2
    function someMethod2(uint256 someInput) external pure returns (uint256, address) {
        return (someInput, address(2));
    }
}
