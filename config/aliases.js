const path = require('path');

const pathInClient = endPath => path.join(process.cwd(), 'src', endPath);

module.exports = {
  components: pathInClient('components'),
  'dom-elements': pathInClient('dom-elements'),
  systems: pathInClient('systems'),
  types: pathInClient('types'),
  utils: pathInClient('utils')
};
