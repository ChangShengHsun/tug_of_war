#!/bin/sh
# Runs pick.test.js with Node's built-in test runner (no dependencies).
cd "$(dirname "$0")" && node --test
