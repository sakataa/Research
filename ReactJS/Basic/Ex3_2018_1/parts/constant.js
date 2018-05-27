const path = require('path');

const inputDir = 'source';
const outputDir = 'dist';
const client = 'client';

const rootPath = path.resolve(__dirname, '..');

module.exports = {
    environment: {
        development: 'development',
        production: 'production'
    },
    projectPath: {
        root: rootPath,
        clientInputPath: path.join(rootPath, inputDir),
        clientOutputPath: path.join(rootPath, outputDir, client)
    }
}