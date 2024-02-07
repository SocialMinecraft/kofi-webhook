// this is very hacky and better design patters exist for this... but if it works, shrug.

var Singleton = {
    kafka: null,
    config: null,
}

module.exports = Singleton;