'use strict';

var Bluebird = require('bluebird');
var Git     = require('./git');
var Package = require('./version');
var Writer  = require('./writer');

exports.unrelease = function () {
  return Bluebird.all([
    Git.getCommits()
  ])
  .spread(function (commits) {
    return Writer.markdown(null, commits);
  });
};

exports.release = function () {
    return Bluebird.all([
        Git.getCommits()
    ])
        .spread(function (commits) {
            return Package.calculateNewVersion(commits).then((release)=> Writer.markdown(release, commits));
        });
};
