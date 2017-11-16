var JiraClient = require('jira-connector');
var exec = require('child_process').exec;
var jira = new JiraClient( {
  host: 'jira.kingmuffin.com',
  basic_auth: {
    username: 'yaroslav',
    password: 'zcz302025'
  }
});

jira.issue.getIssue({
  issueKey: 'MEIS-100'
}, function(error, issue) {

    var commit=`Bug: ${issue.key} \n\n ${issue.fields.summary} \n\n BREAKING CHANGE: this major version`;
    exec(`git add . && git commit -m"${commit}"`)
});
