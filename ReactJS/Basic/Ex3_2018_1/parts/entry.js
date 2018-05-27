const path = require("path");
const { projectPath } = require("./constant");

const { clientInputPath, clientOutputPath } = projectPath;
const pagePath = path.join(clientInputPath, "pages");

module.exports = env => {
  const client = {
    'sample': './source/pages/sample/components/index.jsx'
  };

  return {
    client
  };
};
