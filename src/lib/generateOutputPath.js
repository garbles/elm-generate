const path = require('path')

module.exports = function generateOutput (moduleName, srcDir, isNative) {
  const splitName = moduleName.split('.')

  if (isNative) {
    return path.join(srcDir, 'Native', ...splitName) + '.js'
  }

  return path.join(srcDir, ...splitName) + '.elm'
}
