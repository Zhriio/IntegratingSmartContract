import { useState, useEffect } from "react";
import { ethers } from "ethers";
import piggybank_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [piggybank, setPiggyBank] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const piggybankABI = piggybank_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getPiggyBankContract();
  };

  const getPiggyBankContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const piggybankContract = new ethers.Contract(contractAddress, piggybankABI, signer);

    setPiggyBank(piggybankContract);
  }

  const getBalance = async () => {
    if (piggybank) {
      setBalance((await piggybank.getBalance()).toNumber());
    }
  }

  const save = async (amount) => {
    if (piggybank) {
      let tx = await piggybank.save(amount);
      await tx.wait()
      getBalance();
    }
  }

  const open = async () => {
    if (piggybank) {
      let tx = await piggybank.openPiggyBank();
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this Piggybank.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <div className="button-group">
          <button className="btn" onClick={() => save(5)}>
            Save 5 ETH
          </button>
          <button className="btn" onClick={() => save(10)}>
            Save 10 ETH
          </button>
          <button className="btn" onClick={() => save(20)}>
            Save 20 ETH
          </button>
        </div>
        <button className="btn" onClick={open}>
          Open Piggybank
        </button>
      </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to your E-Piggybank!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        .btn {
          padding: 10px 15px;
          margin: 10px;
          font-size: 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: #005bb5;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
        }

        p {
          font-size: 18px;
          margin: 10px 0;
        }
      `}
      </style>
    </main>
  )
}
