import { expect } from 'chai'
import { describe, it, before } from 'mocha'
import shell from 'execa'

import fn from '../../src'
import testDirConfig from './config'

let execaOpt={
  silent: true,
  cwd: testDirConfig.temp,
}
describe('Create dummy commits', function() {
  this.timeout(50000)
  before(async () => {
    // clean the test temp dir
    await shell('rm', ['-rf', testDirConfig.temp], { silent: true })
    await shell('mkdir', ['-p', testDirConfig.temp], { silent: true })
    // go into the test temp dir
    // init a git repo in the test temp dir
    await shell('git', ['init'], { silent: true, cwd: testDirConfig.temp })
  })
  beforeEach(() => {})

  afterEach(() => {})
  after(async ()=> {
    // clean the test temp dir
    await shell('rm', ['-rf', testDirConfig.temp], { silent: true })
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
  it('default commit:passed msg with empty str', async () => {
    await fn('',execaOpt)
    let {stdout}= await shell('git', ['log'], execaOpt)
    expect(stdout).to.include('Test commit')
    await fn(' ',execaOpt)
    stdout= (await shell('git', ['log'], execaOpt)).stdout
    expect(stdout).to.include('Test commit')
  })
  it('default commit:passed msg with empty array', async () => {
    await fn([],execaOpt)
    let {stdout}= await shell('git', ['log'], execaOpt)
    expect(stdout).to.include('Test commit')
  })
  it('custom commit:passed msg with str', async () => {
    await fn('awesome',execaOpt)
    let {stdout}= await shell('git', ['log'], execaOpt)
    expect(stdout).to.include('awesome')
  })
  it('custom commit:passed msg with arr', async () => {
    await fn(['build: init', 'fix:'],execaOpt)
    let {stdout}= await shell('git', ['log'], execaOpt)
    expect(stdout).to.include('build:')
    expect(stdout).to.include('fix:')
  })
})
