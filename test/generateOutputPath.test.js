const assert = require('assert')
const generateOutputPath = require('../src/lib/generateOutputPath')

describe('generateOutputPath', () => {
  it('generates an output elm file', () => {
    const output = generateOutputPath('Gabe.Module', '/src', false)
    assert.equal(output, '/src/Gabe/Module.elm')
  })

  it('generates an output js file', () => {
    const output = generateOutputPath('Gabe.Module', '/src', true)
    assert.equal(output, '/src/Native/Gabe/Module.js')
  })
})
