const fs = require('node:fs');
const path = require('node:path');
const { Console }  = require( 'node:console')
const { Transform } = require( 'node:stream')
const { getLanguageService } = require('@swagger-api/apidom-ls');
const core = require('@actions/core');
const { TextDocument } = require('vscode-languageserver-textdocument');


const definitionFile = process.argv.at(2);
const failsOn = parseInt(process.argv.at(3), 10);
const definitionFilePath = path.join('/github/workspace', definitionFile);
const definitionFileContent = fs.readFileSync(definitionFilePath, { encoding:'utf8', flag:'r' });
const languageService = getLanguageService({});
const textDocument = TextDocument.create(definitionFile, 'apidom', 0, definitionFileContent);

const DiagnosticSeverity = {
  Error: 1,
  Warning: 2,
  Information: 3,
  Hint: 4,
}

const mapLine = (range) => `${range.start.line}:${range.start.character}`;
const mapSeverity = (severity) => severity === DiagnosticSeverity.Error
  ? 'error'
  : severity === DiagnosticSeverity.Warning
  ? 'warning'
  : severity === DiagnosticSeverity.Information
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
const getSeverityCount = (severity, { errors, warnings, information, hints }) => {
  const components = [errors, warnings, information, hints];
  return components.slice(0, severity).reduce((total, current) => total + current.length, 0);
};

(async () => {
  core.info(`\u001b[1mApiDOM lint ${definitionFile}`);

  const validationResult = await languageService.doValidation(textDocument);
  const errors = validationResult.filter((diagnostic) => diagnostic.severity === DiagnosticSeverity.Error);
  const warnings = validationResult.filter((diagnostic) => diagnostic.severity === DiagnosticSeverity.Warning);
  const information = validationResult.filter((diagnostic) => diagnostic.severity === DiagnosticSeverity.Information);
  const hints = validationResult.filter((diagnostic) => diagnostic.severity === DiagnosticSeverity.Hint);

  languageService.terminate();

  // print result
  if (validationResult.length > 0) {
    core.info('');
    core.info(`\u001b[4m${definitionFile}`);
    core.info(mapDiagnostics(validationResult));
  }

  // print summary
  const color = errors.length > 0
    ? '\u001b[1;31m'
    : warnings.length > 0
    ? '\u001b[1;33m'
    : '\u001b[1;1m';
  core.info(`${color}${errors.length + warnings.length} problems (${errors.length} error, ${warnings.length} warnings, ${information.length} information, ${hints.length} hints)`);

  // fail the action depending on severity defined in `failsOn`
  if (getSeverityCount(failsOn, { errors, warnings, information, hints }) > 0) {
    core.setFailed('');
  }
})();
