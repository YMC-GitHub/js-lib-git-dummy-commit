import { expect } from 'chai'
import { describe, it, before } from 'mocha'
import shell from 'shelljs'

import fn from '../../src'
import testDirConfig from './config'

describe('Create dummy commits', function() {
  this.timeout(50000)
  before(done => {
    shell.config.silent = true
    // clean the test temp dir
    shell.rm('-rf', testDirConfig.temp)
    shell.mkdir(testDirConfig.temp)
    // go into the test temp dir
    shell.cd(testDirConfig.temp)
    // init a git repo in the test temp dir
    shell.exec('git init')
    done()
  })
  beforeEach(() => {})

  afterEach(() => {})
  after(() => {
    shell.config.silent = true
    // clean the test temp dir
    shell.rm('-rf', testDirConfig.temp)
  })

  it('default commit:passed msg with undefined', done => {
    fn()
    expect(shell.exec('git log').stdout).to.include('Test commit')
    done()
  })
  it('default commit:passed msg with empty str', done => {
    fn('')
    expect(shell.exec('git log').stdout).to.include('Test commit')
    fn(' ')
    expect(shell.exec('git log').stdout).to.include('Test commit')
    done()
  })
  it('default commit:passed msg with empty array', done => {
    fn([])
    expect(shell.exec('git log').stdout).to.include('Test commit')
    done()
  })
  it('custom commit:passed msg with str', done => {
    fn('awesome')
    expect(shell.exec('git log').stdout).to.include('awesome')
    done()
  })
  it('custom commit:passed msg with arr', done => {
    fn(['build: init', 'fix:'])
    expect(shell.exec('git log').stdout).to.include('build:')
    expect(shell.exec('git log').stdout).to.include('fix:')
    done()
  })
})
