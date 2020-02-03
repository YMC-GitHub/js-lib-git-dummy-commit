/*
import index from './index'
export default index
*/
import shell from 'shelljs'
import * as utils from './utils'

const defaultMsg = 'Test commit'

const makeDefault = str => {
  if ((utils.isStringType(str) && !str.trim()) || utils.isUndefiend(str)) {
    return defaultMsg
  }
  return str
}

const main = (msg, silent) => {
  let arg = ''
  // eslint-disable-next-line no-param-reassign
  msg = makeDefault(msg)

  if (silent === undefined) {
    // eslint-disable-next-line no-param-reassign
    silent = true
  }

  if (Array.isArray(msg)) {
    if (msg.length) {
      msg.forEach(function(m) {
        // eslint-disable-next-line no-param-reassign
        m = makeDefault(m)

        arg += `-m"${m}" `
      })
    } else {
      arg = `-m"${defaultMsg}"`
    }
  } else {
    arg = `-m"${msg}"`
  }

  shell.exec(`git commit ${arg} --allow-empty --no-gpg-sign`, {
    silent,
  })
}
export default main
