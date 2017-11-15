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
  issueKey: 'MEIS-249'
}, function(error, issue) {

    var commit=`${issue.fields.issuetype.name} : ${issue.key} \n ${issue.fields.summary}`;

    exec(`git add . && git commit -m"${commit}"`)
});
