var Changelog = require('./generate-changelog/lib/index');
var Fs        = require('fs');

return Changelog.generate({  repoUrl: 'https://github.com/Dertod25/MyFirstAppReact' })
    .then(function (changelog) {
        Fs.writeFileSync('./generate-changelog/HYSTORY.md', changelog);
    });
