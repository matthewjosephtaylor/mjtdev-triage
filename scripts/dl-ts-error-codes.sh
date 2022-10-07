#!/usr/bin/env bash

set -ex

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


DATA_DIR="${SCRIPT_DIR}/data"
TS_VERSION="4.8.4"

mkdir -p "${DATA_DIR}"
# https://stackoverflow.com/a/72861909/5306554
curl -sL "https://github.com/microsoft/TypeScript/raw/v${TS_VERSION}/src/compiler/diagnosticMessages.json" > "${DATA_DIR}/diagnosticMessages.json"