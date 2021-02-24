import { BlockChain, Transaction } from "./src/blockchain.js"
import EC from "elliptic/lib/elliptic/ec/index.js";

const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate("1d88a6c045f147fc19260f30ee341021332ee0165085fa4dc919538440acdb66");
const myWalletAddress = myKey.getPublic("hex");



let blockChain = new BlockChain();

const tx1 = new Transaction(myWalletAddress, "public key of someone else", 10);
tx1.signTransaction(myKey);
blockChain.addTransaction(tx1);

console.log('\n Starting mining...');
blockChain.minePendingTransactions(myWalletAddress);

console.log('\n My balance is ', blockChain.getBalanceOfAddress(myWalletAddress));

console.log(`Is chain valid? ${blockChain.isChainValid()}`)

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
