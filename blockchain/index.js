const Block = require('./block');


class Blockchain
{

constructor()
 {
   this.chain = [Block.genesis()];
 }


addBlock(data)
{
const block = Block.mineBlock(this.chain[this.chain.length-1],data); //This adds the new data to a block and then puts the block at after the last block which is found by using the first parameter in the function
this.chain.push(block); //This pushes the new block to the end of the chain

return block;
}


isvalidchain(chain)   //check the chain for validation
{
 if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

 for(let i=1; i<chain.length; i++)
 {
  const block = chain[i]; //current block in the chain
  const lastBlock = chain[i-1]; //Block before the current block in the chain

  if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
      return false;
  }

 }

 return true;

}

replaceChain(newChain)
{
    if(newChain.length <= this.chain.length){
     console.log('Received Chain is not longer than current chain.');
     return;

    }else if(!this.isvalidchain(newChain)){
        console.log('The received chain is not valid.');
        return;
    }

    console.log('Replacing blockchain with new chain.')
    this.chain = newChain;
}


}

module.exports = Blockchain;