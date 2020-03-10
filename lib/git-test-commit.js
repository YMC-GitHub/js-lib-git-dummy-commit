/**
 * git-test-commit v1.0.0
 * (c) 2018-2020 yemiancheng <ymc.github@gmail.com>
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('execa')) :
  typeof define === 'function' && define.amd ? define(['execa'], factory) :
  (global = global || self, global['git-test-commit'] = factory(global.shell));
}(this, function (shell) { 'use strict';

  shell = shell && shell.hasOwnProperty('default') ? shell['default'] : shell;

  var isStringType = function (str) { return typeof str === 'string'; };
  var isUndefiend = function (str) { return str === undefined; };

  var defaultMsg = 'Test commit';

  var makeDefault = function (str) {
    if ((isStringType(str) && !str.trim()) || isUndefiend(str)) {
      return defaultMsg
    }
    return str
  };

  var main = function (msg, execaOpt) {
    if ( execaOpt === void 0 ) execaOpt={};

    var arg = '';
    // eslint-disable-next-line no-param-reassign
    msg = makeDefault(msg);

    if (Array.isArray(msg)) {
      if (msg.length) {
        msg.forEach(function(m) {
          // eslint-disable-next-line no-param-reassign
          m = makeDefault(m);

          arg += "\"" + m + "\" ";
        });
      } else {
        arg = "\"" + defaultMsg + "\"";
      }
    } else {
      arg = "\"" + msg + "\"";
    }

    return shell('git', ['commit', "-m",("" + arg), '--allow-empty', '--no-gpg-sign','--no-verify'],Object.assign({},execaOpt))
  };

  return main;

}));
