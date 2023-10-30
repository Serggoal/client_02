import React from 'react';
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import Layout from "../components/Layout";
import StepOrdered from "../components/StepOrdered";
import FooterResult from "../components/FooterResult";
import BlocksForGame from "../components/BlocksForGame";
import Score from "../components/Score";
import HeaderUp from "../components/HeaderUp";
import HeaderConnect from "../components/HeaderConnect";
import AllStats from "../components/AllStats";
import { Input, Modal, Button, List, Segment, TransitionablePortal, Header} from "semantic-ui-react";

const Index = () => {
    const [human, setHuman] = useState("");
    const [bot, setBot] = useState("");
    const [result, setResult] = useState("");
    const [noticeBot, setNoticeBot] = useState("Run bot");
    const [colorButtonBot, setColorButtonBot] = useState("violet");
    const [resultColor, setResultColor] = useState("grey");
    const [resultIcon, setResultIcon] = useState("game");
    const [countHuman, setCountHuman] = useState(0);
    const [countBot, setCountBot] = useState(0);
    const [smileScore, setSmileScore] = useState();
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [contractGameSinger, setContractGameSinger] = useState(null);
    const [contractChainlinkSinger, setContractChainlinkSinger] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [bet, setBet] = useState(0);
    const [rateGame, setRateGame] = useState();
    const [depo, setDepo] = useState();
    const [tokenPrice, setTokenPrice] = useState(0);
    const [bankroll, setBankroll] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openModalWin, setOpenModalWin] = useState(false);
    const [openModalLost, setOpenModalLost] = useState(false);
    const [openModalDraw, setOpenModalDraw] = useState(false);
    const [openModalDepo, setOpenModalDepo] = useState(false);
    const [openModalUserClaim, setOpenModalUserClaim] = useState(false);
    const [modalContent, setModalContent] = useState("This is error");
    const [isShowResult, setIsShowResult] = useState(false);
    const [isActiveShowButton, setIsActiveShowButton] = useState(true);
    const [thirdStep, setThirdStep] = useState(false);
    const [openPortal, setOpenPortal] = useState(false);
    const [openPortal20, setOpenPortal20] = useState(false);
    const [provider, setProvider] = useState("");
    const [balanceOfContract, setBalanceOfContract] = useState(0);
    const [minBet, setMinBet] = useState("");
    const [minDepo, setMinDepo] = useState("");
    const [lastRandomId, setLastRandomId] = useState("");
    const [fulfilled, setFulfilled] = useState(0);
    const [roundWinner, setRoundWinner] = useState("");
    const [roundCount, setRoundCount] = useState(0);
    const [balanceAcc, setBalanceAcc] = useState(0);
    const [totalTokens, setTotalTokens] = useState(0);
    const [userTokens, setUserTokens] = useState(0);
    const [userTokensClaim, setUserTokensClaim] = useState(0);

    const [txhash, setTxhash] = useState("");
    const miniTxhash = (txhash).substring(0, 5) + '.....' + (txhash).slice(45);
    const hashLink = 'https://polygonscan.com/tx/';
    const hashLinkPlus = hashLink + txhash;

    const userReward = userTokens / totalTokens * balanceOfContract;

  const initConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId != 80001) {
        setModalContent('For the game need Polygon newtwork');
        setOpenModal(true);
      } else {
        const newSigner = await provider.getSigner();
        setAccount(accounts[0])
        setProvider(provider);
        setContract(
          new ethers.Contract(
            '0xD534125EA08F59857E176e401a3D303f4Bd0E67a',[
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "holder",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_partner",
                            "type": "address"
                        }
                    ],
                    "name": "deletePartner",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        }
                    ],
                    "name": "depo",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "userTokens",
                            "type": "uint256"
                        }
                    ],
                    "name": "DepoMintTokens",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "firstDepo",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_userBet",
                            "type": "uint256"
                        }
                    ],
                    "name": "gameplay",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getBalance",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_reward",
                            "type": "uint256"
                        }
                    ],
                    "name": "payRewardDraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_reward",
                            "type": "uint256"
                        }
                    ],
                    "name": "payRewardWin",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "userTokens",
                            "type": "uint256"
                        }
                    ],
                    "name": "PlaygameMintTokens",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "_player",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_reward",
                            "type": "uint256"
                        }
                    ],
                    "name": "RewardPlayer",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "rewardForPlayer",
                            "type": "uint256"
                        }
                    ],
                    "name": "Rewarding",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_tokenHolder",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_withdrawTokens",
                            "type": "uint256"
                        }
                    ],
                    "name": "rewardTokenHolders",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_bankroll",
                            "type": "uint256"
                        }
                    ],
                    "name": "setBankroll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_partner",
                            "type": "address"
                        }
                    ],
                    "name": "setPartner",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_partner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_rate",
                            "type": "uint256"
                        }
                    ],
                    "name": "setPartnerRate",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_rateBankFee",
                            "type": "uint256"
                        }
                    ],
                    "name": "setRateBankFee",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_rateGame",
                            "type": "uint256"
                        }
                    ],
                    "name": "setRateGame",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "stateMutability": "payable",
                    "type": "fallback"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "holder",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "bankroll",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "contractBalance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "degree",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getBankroll",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_partner",
                            "type": "address"
                        }
                    ],
                    "name": "getPartnerRate",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTokenPrice",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "partner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "partnersRate",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateBankFee",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateGame",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalTokens",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            newSigner
          )
        );
        setContractGameSinger(
          new ethers.Contract(
            '0xB7EB3A80028202a20d5F180a5D08F442ad8f4BA9',[
                {
                    "inputs": [],
                    "name": "depo",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_random_contract",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_main_contract",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "name": "Draw",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_requestId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getGameStatus",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPartnerWithdrawal",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "howMuch",
                            "type": "uint256"
                        }
                    ],
                    "name": "PartnerWithdrawal",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        }
                    ],
                    "name": "RewardTokens",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "howManyRewards",
                            "type": "uint256"
                        }
                    ],
                    "name": "Rewarding",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_withdrawTokens",
                            "type": "uint256"
                        }
                    ],
                    "name": "rewardTokenUsers",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "contract InterfaceMainLP",
                            "name": "_main_contract",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_main_repeat_contract",
                            "type": "address"
                        }
                    ],
                    "name": "setMainContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "contract IVRFv2Consumer",
                            "name": "_random_contract",
                            "type": "address"
                        }
                    ],
                    "name": "setRandomContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_rate",
                            "type": "uint256"
                        }
                    ],
                    "name": "setRate",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_userChoice",
                            "type": "uint256"
                        }
                    ],
                    "name": "startRequestRandom",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "stateMutability": "payable",
                    "type": "fallback"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                },
                {
                    "inputs": [],
                    "name": "addressPlayer",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "botChoice",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "degree",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "main_payable",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "minBet",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "minDepo",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "nextUser",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rate",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "roundWinner",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "userBet",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "userChoice",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            newSigner
          )
        );
        setContractChainlinkSinger(
          new ethers.Contract(
            '0xa4F89aCbF9f1ff14dDddAfe87fb766Af8C593176',[
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_requestId",
                            "type": "uint256"
                        }
                    ],
                    "name": "closeRandom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_partner",
                            "type": "address"
                        }
                    ],
                    "name": "deletePartner",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint64",
                            "name": "subscriptionId",
                            "type": "uint64"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "have",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "want",
                            "type": "address"
                        }
                    ],
                    "name": "OnlyCoordinatorCanFulfill",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "requestId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "randomWords",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "rawFulfillRandomWords",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "requestId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "randomWords",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "RequestFulfilled",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "requestRandomWords",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "requestId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "requestId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint32",
                            "name": "numWords",
                            "type": "uint32"
                        }
                    ],
                    "name": "RequestSent",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32",
                            "name": "_numWords",
                            "type": "uint32"
                        }
                    ],
                    "name": "setNumWords",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_partner",
                            "type": "address"
                        }
                    ],
                    "name": "setPartner",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_requestId",
                            "type": "uint256"
                        }
                    ],
                    "name": "existOrNot",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_requestId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getCurrentRandom",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_requestId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getFulfillStatus",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getLastRequestId",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_requestId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getRequestStatus",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "fulfilled",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "randomWords",
                            "type": "uint256[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "lastRequestId",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "partner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "requestIds",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "s_requests",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "fulfilled",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "exists",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ] ,
            newSigner
          )
        );
        const balanceOfContract = await provider.getBalance("0xD534125EA08F59857E176e401a3D303f4Bd0E67a");
        const balanceOfContract2= ethers.formatEther(balanceOfContract)
        setBalanceOfContract(balanceOfContract2.toString());

        setIsConnected(true);
        setIsActiveShowButton(false);
    }
    } else {
      setModalContent('For the deposit & game need Metamask. For mobile: open /appstone.site/ inside the mobile wallet browser');
      setOpenModal(true);
    }
  };

//   for stats

  useEffect(() => {
    (async () => {
      if (contract) {
        try {
          const balanceAcc = await provider.getBalance(account);
          const balanceAcc2= ethers.formatEther(balanceAcc);
          setBalanceAcc(balanceAcc2.toString());

          const minDepo = await contractGameSinger.minDepo();
          const minDepo2= ethers.formatEther(minDepo);
          setMinDepo(minDepo2.toString());

          const minBet = await contractGameSinger.minBet();
          const minBet2= ethers.formatEther(minBet);
          setMinBet(minBet2.toString());

          const bankroll = await contract.bankroll();
          const bankroll2= ethers.formatEther(bankroll);
          setBankroll(bankroll2.toString());

          const totalTokens = await contract.totalSupply();
          const totalTokens2= ethers.formatEther(totalTokens);
          setTotalTokens(totalTokens2.toString()); 
        
          const balanceOfContract = await provider.getBalance("0xD534125EA08F59857E176e401a3D303f4Bd0E67a");
          const balanceOfContract2= ethers.formatEther(balanceOfContract);
          setBalanceOfContract(balanceOfContract2.toString());

          const userTokens = await contract.balanceOf(account);
          const userTokens2= ethers.formatEther(userTokens);
          setUserTokens(userTokens2.toString());

          const rateGame = await contract.rateGame();
          //const rateGame2= ethers.formatEther(rateGame);
          setRateGame(rateGame.toString());

        //   const tokenPrice = await contract.getTokenPrice();
        //   const tokenPrice2= ethers.formatEther(tokenPrice);
        //   setTokenPrice(tokenPrice2.toString());

         } catch (error) {
          console.error("error: ", error);
          setModalContent(error.message);
          setOpenModal(true);
        }
      }
    }) ();
  }, [depo, bet, roundCount, isConnected, isShowResult, isActiveShowButton]);

  // postponed function for getting the result of the game

  const checkFulfill = async () => {
      try {
       const fulfill = await contractChainlinkSinger.getFulfillStatus(lastRandomId);
       console.log("txChainlink ", fulfill);
        if(!fulfill) {
          setFulfilled(prev => prev + 1);
        } else if(fulfill) {
          try {
            const tokenPrice = await contract.getTokenPrice();
            const tokenPrice2= ethers.formatEther(tokenPrice);
            setTokenPrice(tokenPrice2.toString());
            
            setOpenPortal20(false);
            const tx = await contractGameSinger.getGameStatus(lastRandomId);
            setOpenPortal(true);
            await tx.wait();
            
            setOpenPortal(false);
            const roundWinner = await contractGameSinger.roundWinner();
            console.log("roundWinner: ", roundWinner);
            setRoundWinner(roundWinner);
            setRoundCount(prev => prev + 1);
            
            setIsActiveShowButton(false);

            if(roundWinner == 0) {
              setOpenModalLost(true);
            } else if(roundWinner == 1) {
              setOpenModalWin(true);
            } else if(roundWinner == 2) {
              setOpenModalDraw(true);
            }
          } catch (error) {
          console.error(error);
         }
        }
       } catch (error) {
        console.error(error);
       }
     }

//  postponed function

useEffect(() => {
  (async () => {
    if(fulfilled != 0) {
     setTimeout(checkFulfill, 20 * 1000);
     console.log("next 20 sec");
    }
  })();
}, [fulfilled]);

  //  user Choose

    function handleHumanChange(e) {
      if(!isConnected) {
      setModalContent('Please, connect to Metamask');
      setOpenModal(true);

      } else {
      setHuman(e.target.value);
      setBot();
      setNoticeBot("Run bot")
      setColorButtonBot("violet")
    }
  }
  
  //  getting the user's choice number for smart-contract

    const userChoice = { 0: "stone", 1: "scissors", 2: "paper" };

    function getUserNumber() {
      if(userChoice[0] == human) {
        return 0;
      } else if(userChoice[1] = human) {
        return 1;
      } else if(userChoice[2] = human) {
        return 2;
      }
    }
   
    // get LastRandomId from smart-contract

    async function getLastRandomId() {
      try {
        const lastRandomId = await contractChainlinkSinger.lastRequestId();

        console.log("lastId: ", lastRandomId);
        setLastRandomId(lastRandomId); 
        setFulfilled(prev => prev + 1);
      } catch (error) {
        console.error("error: ", error);
        setModalContent(error.message);
        setOpenModal(true);
      }
    } 

     //  function deposit to the game

    const handleDepoGame = async () => {
        setIsActiveShowButton(true);
      if(depo < minDepo) {
        setModalContent('Incorrect sum. Need more than or equal to 1');
        setOpenModal(true);
      } else {
        try {
          const tokenPrice = await contract.getTokenPrice();
          const tokenPrice2= ethers.formatEther(tokenPrice);
          setTokenPrice(tokenPrice2.toString());
          
          let tx = await contractGameSinger.depo({
            value: ethers.parseEther(depo),
          });
          console.log("tx hash: ", tx.hash);
          setTxhash(tx.hash);
          setOpenPortal(true);
          await tx.wait();
          
          setOpenPortal(false);
          setOpenModalDepo(true);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsActiveShowButton(false);
          setIsShowResult(false);
       
        } catch (error) {
          if (error.reason === 'INSUFFICIENT_FUNDS') {
            setModalContent('INSUFFICIENT_FUNDS!');
            setOpenModal(true);
            setIsActiveShowButton(false);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
          }
          else if (error.reason === "rejected") {
            setModalContent('The transaction was rejected by the user');
            setOpenModal(true);
            setIsActiveShowButton(false);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
          }
          else if (error.reason === 'CALL_EXCEPTION') {
            setModalContent('Transaction error, try again');
            setOpenModal(true);
            setIsActiveShowButton(false);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
          } else {
          console.error("error: ", error);
          setIsActiveShowButton(false);
          setModalContent(error.message);
          setOpenModal(true);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
        } 
       }
      }
    }

   //  play's function 
   // handleClickBot --> startRequestRandom --> getLastRandomId -->
   // --> setFulfilled --> setTimeout(checkFulfill, 20sec) --> getGameStatus -->
   // --> roundWinner

    const handleClickBot = async () => {
        setIsActiveShowButton(true);
        setIsShowResult(false);
        setResultColor("grey");
        setResultIcon("game");
        if(!isConnected) {
        setIsActiveShowButton(false); 
        setModalContent('Please, connect to Metamask');
        setOpenModal(true);

        } else if(balanceOfContract == 0) {
        setIsActiveShowButton(false);
         setColorButtonBot("red")
         return setNoticeBot("Game not start")
        }
        
        else if(!human) {
          setIsActiveShowButton(false);
          setColorButtonBot("red")
          return setNoticeBot("Your move first")
        }

        else if(!bet) {
          setIsActiveShowButton(false);
          setColorButtonBot("red")
          return setNoticeBot("Your bet need")
        }

        else if(bet < minBet) {
          setIsActiveShowButton(false);
          setModalContent("Incorrect sum. Need more than or equal to 0.1");
          setOpenModal(true);
        }

        else if(bet > balanceOfContract / bankroll) {
          setIsActiveShowButton(false);
          setModalContent("Not enouth funds in game!");
          setOpenModal(true);
        } else {
            const userNext = await contractGameSinger.nextUser();
            if(userNext) {
              setIsActiveShowButton(false);
              setModalContent("You are in line. Sorry, you can't play now because the game is busy! Just wait 10 seconds and start again!");
              setOpenModal(true);
            } else {
       try {
        setThirdStep(true);
        let tx = await contractGameSinger.startRequestRandom(getUserNumber(), {
          value: ethers.parseEther(bet),
        });
        setTxhash(tx.hash);
        setOpenPortal(true);
        await tx.wait();
        setOpenPortal(false);

        setOpenPortal20(true);
        // launching a temporary function
        await getLastRandomId();

        setResultIcon("game");
    
      } catch (error) {
        if (error.reason === 'INSUFFICIENT_FUNDS') {
          setModalContent('INSUFFICIENT FUNDS!');
          setOpenModal(true);
          setIsActiveShowButton(false);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
        }
        else if (error.reason === "rejected") {
          setModalContent('The transaction was rejected by the user');
          setOpenModal(true);
          setIsActiveShowButton(false);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
        }
        else if (error.reason === 'CALL_EXCEPTION') {
          setModalContent('Transaction error, try again');
          setOpenModal(true);
          setIsActiveShowButton(false);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsShowResult(false);
        } else {
        console.error("error: ", error);
        setIsActiveShowButton(false);
        setModalContent(error.message);
        setOpenModal(true);
        setHuman("");
        setBot("");
        setResult("");
        setResultColor("grey");
        setResultIcon("game");
        setIsShowResult(false);
        setThirdStep(false);
        }
       }
      }
     }   
    };

    // Claim LP

    const handleClaimRewards25 = async () => {
      try {
        setIsActiveShowButton(true);
        const userToken = await contract.balanceOf(account);
        let userTokens25 = userToken / 4n;

        const userTokens2= ethers.formatEther(userTokens25);
        setUserTokensClaim(userTokens2.toString());

        let res = await contractGameSinger.rewardTokenUsers(userTokens25, {gasLimit: 100000});
        setTxhash(res.hash);
        setOpenPortal(true);
        await res.wait();
        setOpenPortal(false);
        setOpenModalUserClaim(true);
        setIsActiveShowButton(false);
      } catch (error) {
        console.error("error: ", error);
        setModalContent(error.message);
        setOpenModal(true);
        setIsActiveShowButton(false);
      }
    };

    const handleClaimRewards50 = async () => {
      try {
        setIsActiveShowButton(true);
        const userToken = await contract.balanceOf(account);
        let userTokens50 = userToken / 2n;

        const userTokens2= ethers.formatEther(userTokens50);
        setUserTokensClaim(userTokens2.toString());

        let res = await contractGameSinger.rewardTokenUsers(userTokens50, {gasLimit: 100000});
        setTxhash(res.hash);
        setOpenPortal(true);
        await res.wait();
        setOpenPortal(false);
        setOpenModalUserClaim(true);
        setIsActiveShowButton(false);
      } catch (error) {
        console.error("error: ", error);
        setModalContent(error.message);
        setOpenModal(true);
        setIsActiveShowButton(false);
      }
    };
    
    const handleClaimRewards100 = async () => {
      try {
        setIsActiveShowButton(true);
        const userToken = await contract.balanceOf(account);

        const userTokens2= ethers.formatEther(userToken);
        setUserTokensClaim(userTokens2.toString());

        let res = await contractGameSinger.rewardTokenUsers(userToken, {gasLimit: 100000});
        setTxhash(res.hash);
        setOpenPortal(true);
        await res.wait();
        setOpenPortal(false);
        setOpenModalUserClaim(true);
        setIsActiveShowButton(false);
      } catch (error) {
        console.error("error: ", error);
        setModalContent(error.message);
        setOpenModal(true);
        setIsActiveShowButton(false);
      }
    };

   // restart game

    const handleClickRestartGame = () => {
        setHuman("");
        setBot("");
        setResult("");
        setResultColor("grey");
        setResultIcon("game");
        setIsActiveShowButton(false);
        setIsShowResult(false);
        setThirdStep(false);
      };

      // restart score
    
    const handleClickRestartScore = () => {
      setCountHuman(0);
      setCountBot(0);
      setHuman("");
      setBot("");
      setResult("");
      setResultColor("grey");
      setResultIcon("game");
      setIsActiveShowButton(false);
      setIsShowResult(false);
      setThirdStep(false);
    }
    
    // function Change user Choose

    const handleChangeMyChoose = () => {
      setHuman("");
      setBot("");
    }

    //get bot picture setBot()
    useEffect(() => {
      (async () => {
         if(roundWinner == 2) {
          setResult("Drawn game");
          if(human == "stone") {
            setBot("stone");
          } else if(human == "scissors") {
              setBot("scissors");
          } else if(human == "paper") {
              setBot("paper");
          }

         } else if(roundWinner == 1) {
          setResult("You win");
          if(human == "stone") {
            setBot("scissors");
          } else if(human == "scissors") {
              setBot("paper");
          } else if(human == "paper") {
              setBot("stone");
          }

         } else if(roundWinner == 0) {
          setResult("You lost");
          if(human == "stone") {
            setBot("paper");
          } else if(human == "scissors") {
              setBot("stone");
          } else if(human == "paper") {
              setBot("scissors");
          }
        }
        if(roundCount != 0) {
           setIsShowResult(true);
        }
    })();
    }, [roundCount]);

    // get score

    useEffect(() => {
      (async () => {
        if(isShowResult) {
        if (result == "You win") {
          setResultColor("green");
          setCountHuman(prev => prev + 1);
          setResultIcon("winner");

        } else if (result == "You lost") {
          setResultColor("red");
          setCountBot(prev => prev + 1);
          setResultIcon("frown outline");

        } else if (result == "Drawn game"){
          setResultColor("blue");
          setResultIcon("handshake outline");
        } else {
          setResultColor("grey");
          setResultIcon("game");
        }
      }
      })();
    }, [isShowResult]);

   // icon of score

    useEffect(() => {
      (async () => {
        if(isShowResult) {
        if (countHuman > countBot) {
          setSmileScore("smile outline");
        } else if (countHuman < countBot) {
          setSmileScore("frown outline");
        } else {
          setSmileScore("balance scale");
        }
       }
      })();
    }, [countHuman, countBot]);

// the effect of resetting the color and lettering on the Bot button

    useEffect(() => {
      (async () => {
        setColorButtonBot("violet");
        setNoticeBot("Run bot");
      })();
    }, [bet, isConnected]);

    return (
<Layout>

  <HeaderUp
 isConnected={isConnected} 
  />

  {/* block - main menu */}

  <HeaderConnect 
     onInitConnection={initConnection}
     account={account}
     balanceOfContract={balanceOfContract}
     balanceAcc={balanceAcc}
     totalTokens={totalTokens}
     userTokens={userTokens}
     isConnected={isConnected}
  />

     {/* block of deposits */}

  <List divided verticalAlign='middle' style={{margin: "20px"}}>
    <List.Item>
     
          <Input
           icon='ethereum'
           iconPosition='left'
           size='small'
           label={{ tag: true, content: 'Deposit to LP!' }}
           labelPosition='right'
           placeholder='0.0        ...No less 0.1'
           onChange={(e) => setDepo(e.target.value)}
          />
         
        {!depo ? "" : 
             <Button 
             disabled={isActiveShowButton}
             color='violet' animated='fade' style={{margin: "5px"}}>
               <Button.Content visible>Provide Liquidity</Button.Content>
               <Button.Content hidden onClick={handleDepoGame}>Let's GO !!!</Button.Content>

             </Button>
        }
       </List.Item>
    </List>

     {/* block - all informations */}

     <AllStats 
      userReward={userReward} 
      isConnected={isConnected} 
      userTokens={userTokens}
      totalTokens={totalTokens}
      tokenPrice={tokenPrice}
      isActiveShowButton={isActiveShowButton}
      onHandleClaimRewards25={handleClaimRewards25}
      onHandleClaimRewards50={handleClaimRewards50}
      onHandleClaimRewards100={handleClaimRewards100}
   />

    {/* block - SCORE */}

    <List divided verticalAlign='middle' style={{margin: "10px"}}>
    <List.Item>
      <List.Content floated='right'>
      <Score 
             countHuman={countHuman}
             countBot={countBot}
             onClickRestartScore={handleClickRestartScore}
             smileScore={smileScore}
           />
      </List.Content>
      </List.Item>
      </List> 

     {/* block - step by step */}

   <StepOrdered 
   human={human} 
   thirdStep={thirdStep} 
   bet={bet}
   isShowResult={isShowResult}
   />

     {/* block - betting */}

   <Segment inverted color='violet' textAlign='center'>
   <Input
    disabled={isActiveShowButton}
    icon='ethereum'
    iconPosition='left'
    label={{ tag: true, content: 'MaxBet: bank/4' }}
    labelPosition='right'
    placeholder='0.00           more 0.01'
    onChange={(e) => setBet(e.target.value)}
  />
  </Segment>

 {/* block - game */}

  <BlocksForGame 
         human={human} 
         bot={bot} 
         bet={bet}
         noticeBot={noticeBot} 
         colorButtonBot={colorButtonBot}
         onHumanChange={handleHumanChange} 
         onChangeMyChoose={handleChangeMyChoose}
         onClickBot={handleClickBot} 
         contract={contract}
         isConnected={isConnected}
         isShowResult={isShowResult}
         isActiveShowButton={isActiveShowButton}
         />

  {/* footer for result */}

  <FooterResult 
    resultColor={resultColor} 
    resultIcon={resultIcon} 
    result={result}
    bot={bot} 
    onClickRestartGame={handleClickRestartGame} 
    isShowResult={isShowResult}
  />
      

  {/* window of error */}
   <Modal
      centered={false}
      open={openModal}
      >
      <Modal.Header>Something wrong!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          {modalContent}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

   {/* the window for getting the fact of the result Win */}
     <Modal
      centered={false}
      open={openModalWin}
      >
      <Modal.Header>Congratulations !!!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
           YOU ARE WINNER !!! <br></br><br></br>
           You've got profit {bet * 2} MATIC.<p></p>
           LET'S TRY AGAIN !!! <p></p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModalWin(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

     {/* the window for getting the fact of the result Lost */}
     <Modal
      centered={false}
      open={openModalLost}
      >
      <Modal.Header>You didn't win but...</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          for your play and attention to the project <br></br><br></br>
          You have received a reward: <br></br><br></br>
           {bet * 10**18 / tokenPrice / rateGame / 10**18} LP tokens. <br></br><br></br>
           Now you have {userTokens} $GAMELP <p></p>
           LET'S TRY AGAIN !!! <p></p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModalLost(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

     {/* the window for getting the fact of the result Draw */}
     <Modal
      centered={false}
      open={openModalDraw}
      >
      <Modal.Header>It looks like no one won!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          You've got your bet {bet} back. <p></p>
          LET'S TRY AGAIN !!! <p></p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModalDraw(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

          {/* the window for getting the fact of the result Depo */}
          <Modal
      centered={false}
      open={openModalDepo}
      >
      <Modal.Header>Thanks for deposit!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          You've got {depo / tokenPrice} LP tokens. <br></br><br></br>
           Now you have {userTokens} $GAMELP. <p></p>
           YOU ARE THE PART OF BANK !!! <p></p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModalDepo(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

    {/* the window for getting the fact of claim Tokens */}
      <Modal
      centered={false}
      open={openModalUserClaim}
      >
      <Modal.Header>Congratulations!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          You've got {userTokensClaim * balanceOfContract / totalTokens} MATIC <br></br><br></br>
           to your address {account}. <p></p>
           !!! Keep playing or provide liquidity to the bank !!! <p></p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModalUserClaim(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

   {/* a window in the waiting of the execution of transactions */}
     <TransitionablePortal
     open={openPortal}>
        <Segment
          style={{ left: '20%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <Header>Transaction in progress...</Header>
          <p></p>
          <p>Please, wait a few seconds</p>
          <p></p>
          <p>or check your tx, via the link below:</p>
          <List.Content>
          <a target='_blank' href={hashLinkPlus}>{miniTxhash}</a>
          </List.Content>
          </Segment>
      </TransitionablePortal>

     {/* the window when starting the deferred function is 20 seconds */}
      <TransitionablePortal
     open={openPortal20}>
        <Segment
          style={{ left: '20%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <Header>Please, wait 20 seconds</Header>
          <p></p>
          <p>We have sent a request to Chainlink!</p>
          <p></p>
          <p>After the result is received, you need to confirm </p>
          <p></p>
          <p>another transaction in order to receive</p>
          <p></p>
          <p>a reward: MATIC or $GAMELP</p>
          <p></p>
          </Segment>
      </TransitionablePortal>
   </Layout>
    );
};
export default Index;