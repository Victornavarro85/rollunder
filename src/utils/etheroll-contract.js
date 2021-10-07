import etherollAbi from './etheroll-abi';

// TODO require vs import
// const SolidityEvent = require('web3/lib/web3/event.js');

const HOUSE_EDGE = 1 / 100.0;

const Networks = Object.freeze({ mainnet: 1, morden: 2, ropsten: 3, rinkeby:4, bsctest:97});

const contractAddresses = {
  [Networks.mainnet]: '0xf478c8Bc5448236d52067c96F8f4C8376E62Fa8f',
  [Networks.ropsten]: '0xb50cb2f458c1EB2F3f2ef5448c1e52eE12316462',
  //[Networks.rinkeby]: '0xdF0A0a6f20DB04D3219a7DA6D42Ed9FE63EA6AE8'
  //[Networks.ropsten]: '0xCDa35b320db29C42ba3A36aC448D4C963AD2CcAe',
  [Networks.rinkeby]: '0x88A2d1a5a855050D53AE74c83ABf5948189fF57A',
  [Networks.bsctest]: '0xcf4B0ceF63df2c170CCc605CcF88aBcB4b5EBFae' //my contract- interactions work!

};


const etherscanUrls = {
  [Networks.mainnet]: 'https://etherscan.io',
  [Networks.ropsten]: 'https://ropsten.etherscan.io',
  [Networks.rinkeby]: 'https://rinkeby.etherscan.io',
  [Networks.bsctest]: 'https://testnet.bscscan.com'
};


const getPayout = (betSize, winningChances) => (
  100 / winningChances * betSize
);

const cutHouseEdge = payout => (
  payout * (1 - HOUSE_EDGE)
);

const getProfit = (betSize, winningChances) => {
  if (winningChances === 0) {
    return 0;
  }
  const rawPayout = getPayout(betSize, winningChances);
  const netPayout = cutHouseEdge(rawPayout);

  return Math.max(netPayout - betSize, 0);
};


// Merges bet logs (LogBet) with bet results logs (LogResult).
const mergeLogs = (logBetEvents, logResultEvents) => {
  const findLogResultEventBylogBetEvent = logBetEvent => (
    logResultEvents.find(logResultEvent => (
      logResultEvent.returnValues.BetID === logBetEvent.returnValues.BetID
      //logResultEvent.returnValues.myid === "0xa5b25c764241bd90a8a8b448e68214bb7fd19ea8302e2da36dfec6a1917c9173"
    ))
  );

  return logBetEvents.map(logBetEvent => ({
    logBetEvent,
    logResultEvent: findLogResultEventBylogBetEvent(logBetEvent),
  }));
};

class EtherollContract {
  constructor(web3, address) {
    this.web3 = web3;
    this.address = address;
    this.abi = etherollAbi;
    this.web3Contract = new web3.eth.Contract(etherollAbi, address);
  }



  // callback(error, result)
  getTransactionLogs(callback) {
    this.web3.eth.getBlockNumber((error, blockNumber) => {
      if (error) {
        console.log(error);
      } else {
        const { address } = this;
        const toBlock = blockNumber;
        const fromBlock = toBlock - 10000;
        const options = {
          address,
          fromBlock,
          toBlock,
        };
        this.web3Contract.getPastEvents('allEvents', options, callback);
      }
    });
  }

  // callback(error, result)
  getMergedTransactionLogs(callback) {
    this.getTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        const logBetEvents = result.filter(evnt => evnt.event === 'LogBet');
        const logResultEvents = result.filter(evnt => evnt.event === 'LogResult');
        const mergedLogs = mergeLogs(logBetEvents, logResultEvents);
        callback(error, mergedLogs);
      }
    });
  }
}




export {
  EtherollContract, etherscanUrls, getProfit, mergeLogs, Networks, contractAddresses,
};
