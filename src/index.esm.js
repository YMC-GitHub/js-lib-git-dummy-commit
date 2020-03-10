/*
import index from './index'
export default index
*/
import shell from 'execa'
import * as utils from './utils'

const defaultMsg = 'Test commit'

const makeDefault = str => {
  if ((utils.isStringType(str) && !str.trim()) || utils.isUndefiend(str)) {
    return defaultMsg
  }
  return str
}

const main = (msg, execaOpt = {}) => {
  let arg = ''
  // eslint-disable-next-line no-param-reassign
  msg = makeDefault(msg)

  if (Array.isArray(msg)) {
    if (msg.length) {
      msg.forEach(function(m) {
        // eslint-disable-next-line no-param-reassign
        m = makeDefault(m)

        arg += `"${m}" `
      })
    } else {
      arg = `"${defaultMsg}"`
    }
  } else {
    arg = `"${msg}"`
  }

  return shell(
    'git',
    ['commit', '-m', `${arg}`, '--allow-empty', '--no-gpg-sign', '--no-verify'],
    Object.assign({}, execaOpt)
  )
}
export default main
