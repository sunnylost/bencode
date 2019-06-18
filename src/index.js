let Decode = require('./decode')
let Encode = require('./encode')

module.exports = {
    encode(input) {
        return Encode(input)
    },

    decode(input, isToJSON) {
        return Decode(input, isToJSON)
    }
}
