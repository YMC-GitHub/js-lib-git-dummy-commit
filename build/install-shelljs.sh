#!/bin/sh

set -e
echo "install differ version of shelljs for test:---$SHELLJS_VERSION--- "
npm isntall --save-prod shelljs@"$SHELLJS_VERSION"
