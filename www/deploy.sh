#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:felixnaredi/ksink-perlin.git main:gh-pages

cd -
