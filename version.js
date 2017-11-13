var conventionalRecommendedBump = require('conventional-recommended-bump');
var semver = require('semver');
var exec = require('child_process').exec;
var config= {
  whatBump: function(commits) {
    var level = 3;

    commits.forEach(function(commit) {
      if (commit.notes.length > 0) {
        level = 0;
      } else if (commit.type === 'feature' && level !==0) {
          level = 1;
      } else if ((commit.type === 'bug' || commit.type === 'improvement') && level !==0 && level !==1) {
        level = 2;
      }
    });

    return {
      level: level
    };
  },
  parserOpts: {
    headerPattern: /^(\w*)(?:\((.*)\))?\: (.*)$/,
    headerCorrespondence: [
      'type',
      'subject'
    ],
    noteKeywords: 'BREAKING CHANGE',
    revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
    revertCorrespondence: ['header', 'hash']
  }
};
conventionalRecommendedBump({
  config: config
}, function(err, result) {
  console.log(result);
  exec("semver-tags --last",
    function (error, v) {
      var str;
      switch (result.level) {
        case 0:
          str = 'v' + (+v[1] + 1) + '.' + 0 + '.' + 0;
          break;
        case 1:
          str = 'v' + v[1] + '.' + (+v[3] + 1) + '.' + 0;
          break;
        case 2:
          str = 'v' + v[1] + '.' + v[3] + '.' + (+v[5] + 1);
          break;
        case 3:
          console.log(`Your version ${v} does not need to be updated`);
          break;

        default:
          console.log('exec error: ' + error);
      }
      str && exec(`git tag ${str} && git push --tags`)
    });
});




