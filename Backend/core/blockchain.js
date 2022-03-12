const { hash256 } = require("../util/util");
const block = require("./block");
const blockchain = require("./blockHeader");

VERSION = 1;
const ZERO_HASH = String("0").padStart(64, "0");

class Blockchain {
  constructor() {
    this.chain = [];
    this.GenesisBlock();
  }

  GenesisBlock() {
    const BlockHeight = 0;
    const prevBlockHash = ZERO_HASH;
    this.addBlock(BlockHeight, prevBlockHash);
  }

  addBlock(BlockHeight, prevBlockHash) {
    let timestamp = Date.now();
    let Transaction = `Codies Alert sent ${BlockHeight} to Anni Maan`;
    let merkleRoot = hash256(Transaction);
    let bits = "ffff001f";
    let blockHeader = new blockchain.BlockHeader(
      VERSION,
      prevBlockHash,
      merkleRoot,
      timestamp,
      bits
    );
    blockHeader.mine();
    this.chain.push(
      new block.Block(BlockHeight, 1, blockHeader, 1, Transaction)
    );
    console.log(this.chain);
  }

  main() {
    while (true) {
      let lastBlock = this.chain[this.chain.length - 1];
      let Blockheight = lastBlock.Height + 1;
      let prevBlockHash = lastBlock.BlockHeader.blockhash;
      this.addBlock(Blockheight, prevBlockHash);
    }
  }
}

if (require.main == module) {
  const blockchain = new Blockchain();
  blockchain.main();
}
