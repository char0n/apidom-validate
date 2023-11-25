# ApiDOM Validator GitHub Action

This GitHub Actions validates [OpenAPI](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) 
3.x.y / [AsyncAPI](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) 2.x definition file
using [ApiDOM Language Service](https://github.com/swagger-api/apidom).

Validation rules are exactly the same as the one that https://editor-next.swagger.io/ uses.

**Supported specifications:**

- OpenAPI 3.0.0
- OpenAPI 3.0.1
- OpenAPI 3.0.2
- OpenAPI 3.0.3
- OpenAPI 3.1.0
- AsyncAPI 2.0.0
- AsyncAPI 2.1.0
- AsyncAPI 2.2.0
- AsyncAPI 2.3.0
- AsyncAPI 2.4.0
- AsyncAPI 2.5.0
- AsyncAPI 2.6.0

## Inputs

## `definition-file`

**Required** Path to definition file.

## `fails-on`

Severity level at which to fail action. Default `1`, if not specified.
- `1`: Fails if **error** messages exist in validation output
- `2`: Fails if **error** or **warning** messages exist in validation output
- `3`: Fails if **error**, **warning** or **information** messages exist in validation output
- `4`: Fails if **error**, **warning**, **information** or **hint** messages exist in validation output

## Example usage

```yaml
uses: char0n/apidom-validate@v1
with:
  definition-file: 'path/to/my/openapi.yaml'
  fails-on: 2
```
