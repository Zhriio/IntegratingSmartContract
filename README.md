# Integrating Smart Contract

## Description
This project showcases the integration of a smart contract with a frontend application by simulating the behavior of a piggy bank. 
It enables users to save and cashout their Ethereum through two smart contract functions: one for adding funds to the "piggy bank" and another for withdrawing all of them, essentially mimicking the act of breaking open the piggy bank.

## Getting Started

### Executing program
To run this program, you can use VSCode and follow the instructions below:

1. Clone the github to VSCode.
2. Inside the project directory, in the terminal type: npm i
3. Open two additional terminals in your VS code
4. In the second terminal type: npx hardhat node
5. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
6. Back in the first terminal, type npm run dev to launch the front-end.
7. After this, the project will be running on your localhost. Typically at http://localhost:3000/

### Usage
1. When the application launches, it will ask you to connect your MetaMask wallet.
2. After connecting your MetaMask, the interface will show your account and current balance.
3. To interact with the smart contract, click one of the three "Save" buttons to deposit Ethereum into your piggy bank with the specified amount.
4. Click the "Open Piggybank" button to withdraw all your saved Ethereum.

## Authors
Lance Benedict F. Feticio

202110075@fit.edu.ph
