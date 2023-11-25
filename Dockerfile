FROM node:20.10.0-bullseye

# use bash as default shell
SHELL ["/bin/bash", "-c"]

WORKDIR /workspace

# install dependencies
RUN npm install @swagger-api/apidom-ls @actions/core vscode-languageserver-textdocument

COPY validate.cjs .
ENTRYPOINT ["node", "/workspace/validate.cjs"]

