/**
 * git-test-commit v1.0.0
 * (c) 2018-2020 yemiancheng <ymc.github@gmail.com>
 * @license MIT
 */
import shell from 'shelljs';

var isStringType = function (str) { return typeof str === 'string'; };
var isUndefiend = function (str) { return str === undefined; };

/*
import index from './index'
export default index
*/

var defaultMsg = 'Test commit';

var makeDefault = function (str) {
  if ((isStringType(str) && !str.trim()) || isUndefiend(str)) {
    return defaultMsg
  }
  return str
};

var main = function (msg, silent) {
  var arg = '';
  // eslint-disable-next-line no-param-reassign
  msg = makeDefault(msg);

  if (silent === undefined) {
    // eslint-disable-next-line no-param-reassign
    silent = true;
  }

  if (Array.isArray(msg)) {
    if (msg.length) {
      msg.forEach(function(m) {
        // eslint-disable-next-line no-param-reassign
        m = makeDefault(m);

        arg += "-m\"" + m + "\" ";
      });
    } else {
      arg = "-m\"" + defaultMsg + "\"";
    }
  } else {
    arg = "-m\"" + msg + "\"";
  }

  shell.exec(("git commit " + arg + " --allow-empty --no-gpg-sign"), {
    silent: silent,
  });
};

export default main;
