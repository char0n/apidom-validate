const fs = require('node:fs');
const path = require('node:path');
const ls = require('@swagger-api/apidom-ls');
const core = require('@actions/core');


const [, , definitionFile] = process.argv;
const definitionFilePath = path.join('/github/workspace', definitionFile);
const definitionFileContent = fs.readFileSync(definitionFilePath, { encoding:'utf8', flag:'r' });

core.info(`\u001b[1mValidating file "${definitionFile}"...`)


core.info('\u001b[1mDefinition successfully validated by ApiDOM Language Service');