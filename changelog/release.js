var Changelog = require('./lib/index');
var Fs        = require('fs');
var exec = require('child_process').exec;
return Changelog.release()
    .then(function (changelog) {
        Fs.writeFileSync('CHANGELOG.md', changelog.content);
        exec(`git tag ${changelog.tag} && git push --tags &&
       npm version --no-git-tag-version ${changelog.tag} && git add . && git commit -m "Release ${changelog.tag}"`)
    });
