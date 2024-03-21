const express = require("express");
const router = express.Router();
const { JsonRpcProvider, Contract } = require("ethers");
const erc20Abi = require("../../utils/erc20Abi.json");
const ALCHEMY_URL = require("../../config").ALCHEMY_URL;

// http://localhost:7777/api/erc20/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
router.get("/:address", (req, res) => {
  const address = req.params.address;
  const provider = new JsonRpcProvider(ALCHEMY_URL);
  const contract = new Contract(address, erc20Abi, provider);
  const result = Promise.all([
    getName(contract),
    getTotalSupply(contract).then((data) => data.toString()),
    getDecimals(contract).then((data) => data.toString()),
    getSymbol(contract),
  ]);
  result
    .then((data) => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err);
    });
});

const getName = async (contract) => {
  return contract.name();
};

const getTotalSupply = async (contract) => {
  return contract.totalSupply();
};

const getDecimals = async (contract) => {
  return contract.decimals();
};

const getSymbol = async (contract) => {
  return contract.symbol();
};

module.exports = router;
