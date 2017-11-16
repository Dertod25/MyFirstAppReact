var Changelog = require('./lib/index');
var Fs        = require('fs');

return Changelog.release()
    .then(function (changelog) {
        Fs.writeFileSync('CHANGELOG.md', changelog);
    });
