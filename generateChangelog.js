var Changelog = require('generate-changelog');
var Fs        = require('fs');

return Changelog.generate({  repoUrl: 'https://github.com/lob/generate-changelog' })
    .then(function (changelog) {
        Fs.writeFileSync('./CHANGELOG.md', changelog);
    });
