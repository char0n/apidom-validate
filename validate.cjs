const fs = require('node:fs');
const path = require('node:path');
const { Console }  = require( 'node:console')
const { Transform } = require( 'node:stream')
const { getLanguageService } = require('@swagger-api/apidom-ls');
const core = require('@actions/core');
const { TextDocument } = require('vscode-languageserver-textdocument');


const [, , definitionFile] = process.argv;
const definitionFilePath = path.join('/github/workspace', definitionFile);
const definitionFileContent = fs.readFileSync(definitionFilePath, { encoding:'utf8', flag:'r' });
const languageService = getLanguageService({});
const textDocument = TextDocument.create(definitionFile, 'apidom', 0, definitionFileContent);

const mapLine = (range) => `${range.start.line}:${range.start.character}`;
const mapSeverity = (severity) => severity === 1
  ? 'error'
  : severity === 2
  ? 'warning'
  : severity === 3
  ? 'information'
  : 'hint';
const mapDiagnostic = ({ range, severity, code, message }) => ({
  line: mapLine(range),
  severity: mapSeverity(severity),
  code,
  message,
})
const mapDiagnostics = (diagnostics) => {
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } });
  const logger = new Console({ stdout: ts });

  logger.table(diagnostics.map(mapDiagnostic));
  return (ts.read() || '').toString();
};

(async () => {
  const validationResult = await languageService.doValidation(textDocument);
  const hasValidationErrors = validationResult.some((diagnostic) => diagnostic.severity === 1);

  core.info(`\u001b[1mApiDOM lint ${definitionFile}\n`)
  core.info(`\u001b[1m${definitionFile}`)
  core.info(mapDiagnostics(validationResult))

  if (hasValidationErrors) {
    core.setFailed('\u001b[38;2;255;0;1mDefinition contains errors.');
  }
})();