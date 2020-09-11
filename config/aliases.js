const path = require('path');

const pathInClient = endPath => path.join(process.cwd(), 'src/client', endPath);

module.exports = {
  components: pathInClient('components')
};
