const SHA256 = require('crypto-js/sha256');

class Block 
{
constructor(timestamp,lastHash,hash,data)//Blocks attributes are inistallised and block is created
{

   this.timestamp = timestamp;
   this.lastHash = lastHash;
   this.hash = hash;
   this.data = data;

}//End of constructor

toString()//This is used to return the information of the blocks in the chain
{
    return `Block -
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0,10)}
    Hash      : ${this.hash.substring(0,10)}
    Data      : ${this.data}`;
}


static genesis()//This will be the very first block in the chain also know as a dummy block
{
  return new this('Genesis Time','-----','fir57-h47h', []);
}


static mineBlock(lastBlock, data)//gives class the ability to create new blocks from previos blocks
{
  const timestamp = Date.now();
  const lastHash = lastBlock.hash;
  const hash = Block.hash(timestamp,lastHash,data);

  return new this(timestamp,lastHash,hash, data);
}

static hash(timestamp,lastHash,data)//Function for creating hash using the previous blocks data
{
 return SHA256(`${timestamp}${lastHash}${data}`).toString();
}

static blockHash(block)
{
  const {timestamp , lastHash , data} = block;
  return Block.hash(timestamp,lastHash,data);
}




}//End of class

module.exports = Block; //this is so we can share the file across the project and creat block objects