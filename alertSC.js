// Import Web3.js library
const { Web3, ETH_DATA_FORMAT } = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
// Set up provider for the desired Ethereum network (Infura in this case)
const web3 = new Web3(
  "https://sepolia.infura.io/v3/76d745c4b363426e8895c5026d60a3aa"
);
// Create a new Web3 instance with the Infura WebSocket endpoint
const web3Scoket = new Web3(
  "wss://sepolia.infura.io/ws/v3/76d745c4b363426e8895c5026d60a3aa"
);

// Define the contract ABI
const contractABI = require("./contractABI.json");

// Define the contract address
const contractAddress = "0x30ba1fa0373ea06364aec715e87bc09566c0a826";

// account private key
const privateKey = Buffer.from(
  "9be79d62853a8b12140f9db8ec132636b9b40f7dcf8cbc3e0be6066eac729e93",
  "hex"
);
const senderAdress = "0xa664fe49a509b242FfF14cAa8Ad7eA876473bD9e";
// Create an instance of the contract
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const contractInstanceSocket = new web3Scoket.eth.Contract(
  contractABI,
  contractAddress
);

// // Example usage: call the addAlert function
const alertToAdd = process.argv[2] || "catch current alert ferdawes 10:30";
async function sendAlert() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/76d745c4b363426e8895c5026d60a3aa"
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    "0x" + "9be79d62853a8b12140f9db8ec132636b9b40f7dcf8cbc3e0be6066eac729e93"
  );
  web3.eth.accounts.wallet.add(signer);
  // Issuing a transaction that calls the `echo` method
  const method_abi = contractInstance.methods.addAlert(alertToAdd).encodeABI();
  const tx = {
    from: signer.address,
    to: contractInstance.options.address,
    data: method_abi,
    value: "0",
    gasPrice: "100000000000",
  };
  const gas_estimate = await web3.eth.estimateGas(tx);
  tx.gas = gas_estimate;
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    signer.privateKey
  );
  console.log("Raw transaction data: " + signedTx.rawTransaction);
  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}
sendAlert();

// // Example usage: call the getAlertsCount function
// contractInstance.methods
//   .getAlertsCount()
//   .call()
//   .then((count) => {
//     console.log("Total number of alerts:", count);
//   })
//   .catch((error) => {
//     console.error("Error getting alerts count:", error);
//   });

// // Example usage: call the getAlert function
// const alertIndex = 0; // Index of the alert to retrieve
// contractInstance.methods
//   .getAlert(alertIndex)
//   .call()
//   .then((alert) => {
//     console.log("Alert at index", alertIndex, ":", alert);
//   })
//   .catch((error) => {
//     console.error("Error getting alert at index", alertIndex, ":", error);
//   });

// Example usage: call the getAllAlerts function
// contractInstance.methods
//   .getAllAlerts()
//   .call()
//   .then((allAlerts) => {
//     console.log("All alerts:", allAlerts);
//   })
//   .catch((error) => {
//     console.error("Error getting all alerts:", error);
//   });

// event to handle listening to add alerts
// const run = async () => {
//   contractInstanceSocket.events
//     .AlertAdded({ fromBlock: "latest" })
//     // .AlertAdded({ fromBlock: 0 })
//     .on("data", (event) => console.log(event));
// };

// run().then(() => {
//   console.log("listening...");
// });

// get passed alert Events
// contractInstanceSocket
//   .getPastEvents(
//     "AlertAdded",
//     {
//       fromBlock: 0,
//       toBlock: "latest",
//     },
//     function (error, events) {
//       console.log(events);
//     }
//   )
//   .then(function (events) {
//     console.log(events); // same results as the optional callback above
//   });
