# ApiDOM Validator GitHub Actions

This GitHub Actions validates OpenAPI 3.x.y / AsyncAPI 2.x definition file using ApiDOM Language Service.
The validation is exactly the same as the one that https://editor-next.swagger.io/ uses.

## Inputs

## `definition-file`

**Required** Path to definition file.


## Example usage

```yaml
uses: char0n/apidom-validate@master
with:
  definition-file: 'path/to/my/openapi.yaml'
```
