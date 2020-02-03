const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const resolvePath = file => path.resolve(rootPath, file)
export default {
  temp: resolvePath('test/unit/tmp'),
}
