var Changelog = require('generate-changelog');
var Fs        = require('fs');

return Changelog.generate({  repoUrl: 'https://github.com/Dertod25/MyFirstAppReact' })
    .then(function (changelog) {
        Fs.writeFileSync('./HYSTORY.md', changelog);
    });
