import sha256 from "crypto-js/sha256.js";

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {        
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }
}

class BlockChain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("23/02/2021 16:21:42", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for  (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let blockChain = new BlockChain();

blockChain.createTransaction(new Transaction('address1', 'address2', 100));
blockChain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting mining...');
blockChain.minePendingTransactions('myAddress');

console.log('\n My balance is ', blockChain.getBalanceOfAddress('myAddress'));

console.log('\n Starting mining...');
blockChain.minePendingTransactions('myAddress');

console.log('\n My balance is ', blockChain.getBalanceOfAddress('myAddress')); // this reward is in the pending transactions

// console.log("Mining block 1...");
// blockChain.addBlock(new Block(1, "23/02/2021 16:22:21", { test: 42 }));

// console.log("Mining block 2...");
// blockChain.addBlock(new Block(2, "23/02/2021 16:22:35", { test: 42 }));

// console.log("Mining block 3...");
// blockChain.addBlock(new Block(3, "23/02/2021 16:22:45", { test: 42 }));


// console.log("Is blockchain valid?" + blockChain.isChainValid());


// blockChain.chain[1].data = { test: 77 };
// blockChain.chain[1].hash = blockChain.chain[1].calculateHash();

// console.log("Is blockchain valid?" + blockChain.isChainValid());

// console.log(JSON.stringify(blockChain));
