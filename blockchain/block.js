const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block 
{
constructor(timestamp,lastHash,hash,data,nonce, difficulty)//Blocks attributes are inistallised and block is created
{

   this.timestamp = timestamp;
   this.lastHash = lastHash;
   this.hash = hash;
   this.data = data;
   this.nonce = nonce;
   this.difficulty = difficulty || DIFFICULTY;

}//End of constructor

toString()//This is used to return the information of the blocks in the chain
{
    return `Block -
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0,10)}
    Hash      : ${this.hash.substring(0,10)}
    Nonce     : ${this.nonce}
    Difficulty: ${this.difficulty}
    Data      : ${this.data}`;
}


static genesis()//This will be the very first block in the chain also know as a dummy block
{
  return new this('Genesis Time','-----','fir57-h47h', [], 0, DIFFICULTY);
}


static mineBlock(lastBlock, data)//gives class the ability to create new blocks from previos blocks
{
  let hash, timestamp;
  const lastHash = lastBlock.hash;
  let {difficulty} = lastBlock;
  let nonce = 0;

  do{
    nonce++;
    timestamp = Date.now();
    difficulty = Block.adjustDifficulty(lastBlock, timestamp);
    hash = Block.hash(timestamp,lastHash,data, nonce, difficulty);
  }while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
 
  return new this(timestamp,lastHash,hash, data, nonce, difficulty);
}


static hash(timestamp,lastHash,data,nonce, difficulty)//Function for creating hash using the previous blocks data
{
 return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
}

static blockHash(block)
{
  const {timestamp , lastHash , data, nonce, difficulty} = block;
  return Block.hash(timestamp,lastHash,data, nonce, difficulty);
}


static adjustDifficulty(lastBlock, currentTime){
  let {difficulty} = lastBlock;
  difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
  return difficulty;
}


}//End of class

module.exports = Block; //this is so we can share the file across the project and creat block objects