// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;

contract AlertSystem {
    // Event to log when a new alert is added
    event AlertAdded(address indexed owner, string alert);

    // Array to store the list of alerts
    string[] public alerts;

    // Function to add a new alert to the list
    function addAlert(string memory _alert) public {
        alerts.push(_alert);
        emit AlertAdded(msg.sender, _alert);
    }

    // Function to get the total number of alerts
    function getAlertsCount() public view returns (uint) {
        return alerts.length;
    }

    // Function to get alert by index
    function getAlert(uint index) public view returns (string memory) {
        require(index < alerts.length, "Index out of bounds");
        return alerts[index];
    }

    // Function to get all alerts
    function getAllAlerts() public view returns (string[] memory) {
        return alerts;
    }
}