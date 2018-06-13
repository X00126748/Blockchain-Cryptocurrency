const Block = require('./block');

//This is the test environment used to text our block class
describe('Block', () => {

let data, lastBlock, block;

beforeEach( () => {
     data = 'var';
     lastBlock = Block.genesis();
     block = Block.mineBlock(lastBlock, data);
});

//This is a unit test to make sure the data the block has matches what was inputed
it('sets the`data` to match the input', () => {
    expect(block.data).toEqual(data);
});
//This is a unit test to make sure the hash of the last block has matches the value you have for the lastHash
it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
 });


});