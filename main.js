const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {        
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "23/02/2021 16:21:42", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
console.log("Mining block 1...");
blockChain.addBlock(new Block(1, "23/02/2021 16:22:21", { test: 42 }));

console.log("Mining block 2...");
blockChain.addBlock(new Block(2, "23/02/2021 16:22:35", { test: 42 }));

console.log("Mining block 3...");
blockChain.addBlock(new Block(3, "23/02/2021 16:22:45", { test: 42 }));


// console.log("Is blockchain valid?" + blockChain.isChainValid());


// blockChain.chain[1].data = { test: 77 };
// blockChain.chain[1].hash = blockChain.chain[1].calculateHash();

// console.log("Is blockchain valid?" + blockChain.isChainValid());

// console.log(JSON.stringify(blockChain));