# ApiDOM Validator GitHub Action

This GitHub Action validates [OpenAPI 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md), [OpenAPI](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) 
3.x.y and [AsyncAPI](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) 2.x definition file using [ApiDOM Language Service](https://github.com/swagger-api/apidom).

Validation rules are exactly the same as the one that https://editor-next.swagger.io/ uses.

**Supported specifications:**

- [OpenAPI 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)
- [OpenAPI 3.0.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md)
- [OpenAPI 3.0.1](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.1.md)
- [OpenAPI 3.0.2](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md)
- [OpenAPI 3.0.3](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)
- [OpenAPI 3.1.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md)
- [AsyncAPI 2.0.0](https://v2.asyncapi.com/docs/reference/specification/v2.0.0)
- [AsyncAPI 2.1.0](https://v2.asyncapi.com/docs/reference/specification/v2.1.0)
- [AsyncAPI 2.2.0](https://v2.asyncapi.com/docs/reference/specification/v2.2.0)
- [AsyncAPI 2.3.0](https://v2.asyncapi.com/docs/reference/specification/v2.3.0)
- [AsyncAPI 2.4.0](https://v2.asyncapi.com/docs/reference/specification/v2.4.0)
- [AsyncAPI 2.5.0](https://v2.asyncapi.com/docs/reference/specification/v2.5.0)
- [AsyncAPI 2.6.0](https://v2.asyncapi.com/docs/reference/specification/v2.6.0)

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
