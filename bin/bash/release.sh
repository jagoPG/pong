#!/usr/bin/env bash
set -e

NODE_ENV=development npm install && npm run build
rm -r ./node_modules
NODE_ENV=production npm install --only=prod