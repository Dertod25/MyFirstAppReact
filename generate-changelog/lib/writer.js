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
var changeLogFile = './generate-changelog/HYSTORY.md';
/**
 * Generate the markdown for the changelog.
 * @param {String} version - the new version affiliated to this changelog
 * @param {Array<Object>} commits - array of parsed commit objects
 * @param {Object} options - generation options
 * @param {Boolean} options.patch - whether it should be a patch changelog
 * @param {Boolean} options.minor - whether it should be a minor changelog
 * @param {Boolean} options.major - whether it should be a major changelog
 * @param {String} options.repoUrl - repo URL that will be used when linking commits
 * @returns {Promise<String>} the \n separated changelog string
 */

function getChangeLog(){
  if (!fs.existsSync(changeLogFile)) {
    return null;
  }
  return fs.readFileSync(changeLogFile, 'utf8');
}


exports.markdown = function (version, commits, options) {

  var oldChangelog = getChangeLog();
  var oldChangelogArr= oldChangelog.split(divider);

  console.log('oldChangelog',oldChangelog)
  console.log('oldChangelogArr',oldChangelogArr)
  console.log('version',version)
  var filterCommits=commits.filter((commit)=>commit.type==='Feature'||commit.type==='Bug'||commit.type==='Improvement')
  console.log(filterCommits)
  var content = [];
  content.push('#CHANGELOG\n==========\n')
  var date = new Date().toJSON().slice(0, 10);
  var heading;

  if (options.major) {
    heading = '##';
  } else if (options.minor) {
    heading = '###';
  } else {
    heading = '####';
  }

  if (version) {
    heading += ' ' + version + ' (' + date + ')';
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

        if (options.repoUrl) {
          shorthash = '[' + commit.subject + '](' +'https://jira.kingmuffin.com/browse/'+ commit.subject + ')';
        }

        content.push(prefix + ' ' + commit.body + ' (' + shorthash + ')');
      });
    });

    content.push('');
  })
  .then(function () {
    if(oldChangelogArr[1]){
         content.push(divider);
         content.push(oldChangelogArr[1].replace(/^\n*/,''));
    }else if(oldChangelog.indexOf('####Unreleased')===-1) {
      content.push(divider);
      content.push(oldChangelog);
    }

    /*    content.push(divider);
        content.push('##RELEASE VERSION');*/
    return content.join('\n');
  });
};
