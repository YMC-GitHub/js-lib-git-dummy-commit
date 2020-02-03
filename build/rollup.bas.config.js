/* eslint-disable global-require */
// include some lib
const path = require('path')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
// const nodeBuiltins = require('rollup-plugin-node-builtins');
const nodeExternals = require('rollup-plugin-node-externals')

// include some data
const dirMapConfig = require('../config/dir.map.config')
const npmPackageConfig = require('../package.json')

const libName = process.env.NAME || npmPackageConfig.name
const yearNow = new Date().getFullYear()
const author = process.env.AUTHOR || npmPackageConfig.author
const version = process.env.VERSION || npmPackageConfig.version
const yearStart = '2018'
const year = yearNow === yearStart ? yearStart : `${yearStart}-${yearNow}`

const banner = `/**
 * ${libName} v${version}
 * (c) ${year} ${author}
 * @license MIT
 */`

const rootPath = path.resolve(__dirname, '../')
const resolve = _path => path.resolve(rootPath, _path)

/**
 * 输入输出配置
 */
const configs = {
  umdDev: {
    /**
     * @prop input 输入文件
     */
    input: resolve(`${dirMapConfig.src}/index.js`),
    /**
     * @prop file 输出文件
     */
    file: resolve(`${dirMapConfig.dist}/${libName}.js`),
    /**
     * @prop format 类库规范
     */
    format: 'umd',
    /**
     * @prop env 当前环境
     */
    env: 'development',
  },
  umdProd: {
    input: resolve(`${dirMapConfig.src}/index.js`),
    file: resolve(`${dirMapConfig.dist}/${libName}.min.js`),
    format: 'umd',
    env: 'production',
  },
  commonjs: {
    input: resolve(`${dirMapConfig.src}/index.js`),
    file: resolve(`${dirMapConfig.dist}/${libName}.common.js`),
    format: 'cjs',
  },
  esm: {
    input: resolve(`${dirMapConfig.src}/index.esm.js`),
    file: resolve(`${dirMapConfig.dist}/${libName}.esm.js`),
    format: 'es',
  },
}

// const external = ['shelljs']
/**
 * 生成rollup配置
 * @param {*} opts 配置
 * @returns {*} config
 */
function genConfig(opts) {
  const config = {
    input: {
      input: opts.input,
      plugins: [
        // nodeBuiltins(),
        // tell rollup not to pack node lib to output file
        nodeExternals({
          builtins: true, // make node builtins external (default: true)
          deps: true, // make pkg.dependencies external (default: false)
          devDeps: true, // make pkg.devDependencies external (default: true)
          peerDeps: true, // make pkg.peerDependencies external (default: true)
          optDeps: true, // make pkg.optionalDependencies external (default: true)
        }),
        // tell rollup to reslove node_moduels lib
        nodeResolve({
          customResolveOptions: {
            moduleDirectory: 'node_modules',
          },
          // preferBuiltins: true,
        }),
        // tell rollup to reslove CommonJS style lib
        commonjs(),
        replace({
          __VERSION__: version,
        }),
        // tell rollup to tranform es6+ to es5
        buble(),
      ],
      // tell rollup not to pack some lib to output file
      // external,
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: libName,
    },
  }

  if (opts.env) {
    config.input.plugins.unshift(
      replace({
        'process.env.NODE_ENV': JSON.stringify(opts.env),
      })
    )
  }

  return config
}

/**
 * 遍历执函
 * @param {*} obj 对象
 * @param {*} fn 函数
 * @returns {Object} 对象
 * @description
 * 遍历对象键值，执行某一函数，返回一个对象，它带有键和值，值为函数结果
 */
function mapValues(obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)
