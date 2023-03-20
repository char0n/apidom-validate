const fs = require('node:fs');
const path = require('node:path');
const { getLanguageService } = require('@swagger-api/apidom-ls');
const core = require('@actions/core');
const { TextDocument } = require('vscode-languageserver-textdocument');


const [, , definitionFile] = process.argv;
const definitionFilePath = path.join('/github/workspace', definitionFile);
const definitionFileContent = fs.readFileSync(definitionFilePath, { encoding:'utf8', flag:'r' });
const languageService = getLanguageService();
const textDocument = TextDocument.create(definitionFile, 'apidom', 0, definitionFileContent);

core.info(`\u001b[1mValidating file "${definitionFile}"`)

(async () => {
  const validationResult = await languageService.doValidation(textDocument);
  core.info(validationResult);
})();


core.info('\u001b[1mDefinition successfully validated by ApiDOM Language Service');