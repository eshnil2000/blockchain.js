/* global test, expect */
var shajs = require('sha.js')
var Block = require('../block.js')

test('Create new Block object', () => {
  let blockOne = new Block(1, [], 100, 1)
  expect(blockOne.index).toBe(1)
  expect(blockOne.transactions).toEqual([])
  expect(blockOne.proof).toBe(100)
  expect(blockOne.previousHash).toBe(1)

  let orderedBlock = {}
  Object.keys(blockOne).sort().forEach((key) => {
    orderedBlock[key] = blockOne[key]
  })

  let previousHash = shajs('sha256').update(JSON.stringify(orderedBlock)).digest('hex')

  let blockTwo = new Block(2, [], 200, previousHash)
  expect(blockTwo.index).toBe(2)
  expect(blockTwo.transactions).toEqual([])
  expect(blockTwo.proof).toBe(200)
  expect(blockTwo.previousHash).toBe(previousHash)

  expect(blockOne).not.toEqual(blockTwo)
})
