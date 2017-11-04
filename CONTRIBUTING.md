# Contribution guide

## Creating releases

Just ` npm run release ` to create a new release.

[Corp-semantic-release](https://www.npmjs.com/package/corp-semantic-release) it will be automatically:

### * to release new versions based on the created commits:
      *  Commits of type `fix` will trigger bugfix releases, think `0.0.1`
      *  Commits of type `feat` will trigger feature releases, think `0.1.0`
      *  Commits with `BREAKING CHANGE` in body or footer will trigger breaking releases, think `1.0.0`
      *  All other commit types will trigger no new release

### * change the version in package.json

### * add changes to the CHANGELOG.md

### * will send a push to the remote branch
