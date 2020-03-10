import { expect } from 'chai'
import { describe, it, before } from 'mocha'
import shell from 'execa'

import fn from '../../src'
import testDirConfig from './config'

describe('Create dummy commits', function() {
  this.timeout(50000)
  before(async () => {
    // clean the test temp dir
     shell('rm', ['-rf', testDirConfig.temp], { silent: true })
     shell('mkdir', ['-p', testDirConfig.temp], { silent: true })
    // go into the test temp dir
    // init a git repo in the test temp dir
     shell('git', ['init'], { silent: true, cwd: testDirConfig.temp })
  })
  beforeEach(() => {})

  afterEach(() => {})
  after(async ()=> {
    // clean the test temp dir
     shell('rm', ['-rf', testDirConfig.temp], { silent: true })
  })
  /*
  //ok:
  it('default commit:passed msg with undefined', done => {
      fn().then(()=>{
        return shell('git', ['log'], {
          silent: true,
          cwd: testDirConfig.temp,
        })
      }).then(({ stdout })=>{
        expect(stdout).to.include('Test commit')
        done()
      })
  })
  */
 it('default commit:passed msg with undefined', async () => {
   await fn();
   let {stdout}= await shell('git', ['log'], {
    silent: true,
    cwd: testDirConfig.temp,
  })
  expect(stdout).to.include('Test commit')
})
  it('default commit:passed msg with empty str', async () => {
    await fn('')
    let {stdout}= await shell('git', ['log'], {
      silent: true,
      cwd: testDirConfig.temp,
    })
    expect(stdout).to.include('Test commit')
    await fn(' ')
    stdout= (await shell('git', ['log'], {
      silent: true,
      cwd: testDirConfig.temp,
    })).stdout
    expect(stdout).to.include('Test commit')
  })
  it('default commit:passed msg with empty array', async () => {
    await fn([])
    let {stdout}= await shell('git', ['log'], {
      silent: true,
      cwd: testDirConfig.temp,
    })
    expect(stdout).to.include('Test commit')
  })
  it('custom commit:passed msg with str', async () => {
    await fn('awesome')
    let {stdout}= await shell('git', ['log'], {
      silent: true,
      cwd: testDirConfig.temp,
    })
    expect(stdout).to.include('awesome')
  })
  it('custom commit:passed msg with arr', async () => {
    await fn(['build: init', 'fix:'])
    let {stdout}= await shell('git', ['log'], {
      silent: true,
      cwd: testDirConfig.temp,
    })
    expect(stdout).to.include('build:')
    expect(stdout).to.include('fix:')
  })
})
