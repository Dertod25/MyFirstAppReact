const promise = require('bluebird');

const options = {
    // Initialization Options
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/dbuserslist';
const db = pgp(connectionString);

// add query functions
function getAllUsers(req, res, next) {
    db.any('select * from listusers')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL users'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function addNewUser(req, res, next) {

    db.none('insert into listusers(login, password, email, firstname, lastname)' +
        'values(${login}, ${password}, ${email}, ${firstname}, ${lastname})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one user'
                });
        })
        .catch(function (err) {
            return next(err)
        });
}
function updateUser(req, res, next) {
    db.none('update listusers set login=$1, password=$2, email=$3, firstname=$4, lastname=$5 where id=$6',
        [req.body.login, req.body.password, req.body.email,
            req.body.firstname,req.body.lastname, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    addNewUser: addNewUser,
    updateUser: updateUser
};

