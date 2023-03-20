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
});
const mapDiagnostics = (diagnostics) => {
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } });
  const logger = new Console({ stdout: ts });

  logger.table(diagnostics.map(mapDiagnostic));
  return (ts.read() || '').toString();
};

(async () => {
  const validationResult = await languageService.doValidation(textDocument);
  const errors = validationResult.filter((diagnostic) => diagnostic.severity === 1);
  const warnings = validationResult.filter((diagnostic) => diagnostic.severity === 2);
  const information = validationResult.filter((diagnostic) => diagnostic.severity === 3);
  const hints = validationResult.filter((diagnostic) => diagnostic.severity === 4);

  languageService.terminate();

  // print result
  if (validationResult.length > 0) {
    core.info(`\u001b[1mApiDOM lint ${definitionFile}`);
    core.info('');
    core.info(`\u001b[4m${definitionFile}`);
    core.info(mapDiagnostics(validationResult));
  }

  // print summary
  const color = errors.length > 0
    ? '\u001b[1;31m'
    : warnings.length > 0
    ? '\u001b[1;33m'
    : '\u001b[1m';
  core.info(`${color}${errors.length + warnings.length} problems (${errors.length} error, ${warnings.length} warnings, ${information.length} information, ${hints.length} hints)`);

  // fail the action on errors
  if (errors.length > 0) {
    core.setFailed('');
  }
})();