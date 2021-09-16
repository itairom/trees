const gComments = require('../data/comments.json')
// const fs = require('fs');


function query(filterBy='') {
    var filterdComments = gComments.filter(comment => comment.message.includes(filterBy) )
    return Promise.resolve(filterdComments)
}

function save(comment) {
    gComments.unshift(comment)
    return Promise.resolve(gComments)
}


module.exports = {
    query, save
}