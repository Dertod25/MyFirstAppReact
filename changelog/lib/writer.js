'use strict';
var fs = require('fs');
var Bluebird = require('bluebird');

var DEFAULT_TYPE = 'other';
var TYPES = {
  Feature: 'New Features',
  Bug: 'Bug Fixes',
  other: 'Other Changes',
  Improvement: 'Performance Improvements',
};
var divider = '-------------';
var changeLogFile = 'CHANGELOG.md';


function getChangeLog(){
  if (!fs.existsSync(changeLogFile)) {
    return null;
  }
  return fs.readFileSync(changeLogFile, 'utf8');
}


exports.markdown = function (release, commits) {
    var filterCommits = [];
    commits.map((commit, i) => {
        if (i === 0) {
            filterCommits.push(commit)
        } else if (!filterCommits.some(elem => commit.subject === elem.subject)) {
            filterCommits.push(commit)
        }
    })
  var oldChangelog = getChangeLog();
  var oldChangelogArr= oldChangelog.split(divider);

  var content = [];
  content.push('# CHANGELOG\n')
  var date = new Date().toJSON().slice(0, 10);
  var heading;

    if (release && release.type === 'major') {
    heading = '## ';
    } else if (release && release.type === 'minor') {
    heading = '### ';
  } else {
    heading = '#### ';
  }

    if (release && release.version) {
        heading += ' ' + release.version + ' (' + date + ')';
  } else {
    heading += 'Unreleased ' + ' (' + date + ')';
  }

  content.push(heading);
  content.push('');

  return Bluebird.resolve(filterCommits)
  .bind({ types: {} })
  .each(function (commit) {
    var type = TYPES[commit.type] ? commit.type : DEFAULT_TYPE;
    var category = commit.category;

    this.types[type] = this.types[type] || {};
    this.types[type][category] = this.types[type][category] || [];

    this.types[type][category].push(commit);
  })
  .then(function () {
    return Object.keys(this.types).sort();
  })
  .each(function (type) {
    var types = this.types;

    content.push('##### ' + TYPES[type]);
    content.push('');

    Object.keys(this.types[type]).forEach(function (category) {
      var prefix = '*';
      var nested = types[type][category].length > 1;
      var categoryHeading = prefix + (category ? ' **' + category + ':**' : '');

      if (nested && category) {
        content.push(categoryHeading);
        prefix = '  *';
      } else {
        prefix = categoryHeading;
      }

      types[type][category].forEach(function (commit) {
        var shorthash = commit.hash.substring(0, 8);

          shorthash = '[' + commit.subject + '](' +'https://jira.kingmuffin.com/browse/'+ commit.subject + ')';


        content.push(prefix + ' ' + commit.body + ' (' + shorthash + ')');
        if(commit.notes){
            content.push('    -' + commit.notes.replace(/^\n*/, '').replace(/\n$/m, ''))
        }
      });
    });

    content.push('');
  })
  .then(function () {
    if(oldChangelogArr[1]){
        release ? content.push('\n') : content.push(divider);
         content.push(oldChangelogArr[1].replace(/^\n*/,''));
    }else if(oldChangelog.indexOf('#### Unreleased')===-1) {
      oldChangelog.length>0 && content.push(divider)&&content.push(oldChangelog);
    }
      if (release) {
          return {content: content.join('\n'), tag: release.version};
      }
    return content.join('\n');
  });
};
