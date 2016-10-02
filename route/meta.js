var express = require('express')
var route = express.Router()

route.get('/', function(req, res) {
    res.json({
        "$auth": {
            "algorithm": "HS256",
            "cookie": null,
            "expiration": 172800,
            "header": "Authorization",
            "refresh": true
        },
        "topic": {
            "get_alltopic": {},
            "post_topic": {},
            "get_topic": {}
        },
        "message": {
            "get_allmessage": {},
            "post_message": {},
            "get_message": {}
        },
        "comment": {
            "get_comment": {},
            "post_comment": {},
        },
        "user": {
            "get": {},
            "post_login": {},
            "put_password": {}
        }
    })
})

module.exports = route
