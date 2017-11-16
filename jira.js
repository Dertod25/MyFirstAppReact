var JiraClient = require('jira-connector');
var Release =require('./version');
var exec = require('child_process').exec;
var jira = new JiraClient( {
  host: 'jira.kingmuffin.com',
  basic_auth: {
    username: 'yaroslav',
    password: 'zcz302025'
  }
});

jira.issue.getIssue({
  issueKey: 'MEIS-212'
}, function(error, issue) {
    var version=Release.version()
 console.log(version);
    var commit=`Feature: ${issue.key} \n\n ${issue.fields.summary}`;

    exec(`git add . && git commit -m"${commit}"`)
});
