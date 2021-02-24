import EC from "elliptic/lib/elliptic/ec/index.js";

const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log();
console.log(`Private Key : ${privateKey}`);
console.log(`Public Key : ${publicKey}`);