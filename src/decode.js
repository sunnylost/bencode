const DELIMITER = 0x3a //':'
const INTEGER_BEGIN = 0x69 //'i'
const LIST_BEGIN = 0x6c //'l'
const DICTIONARY_BEGIN = 0x64 //'d'
const DELIMITER_END = 0x65 //'e'

function integer(buf, ctx) {
    let result = []
    let c

    while ((c = buf[ctx.position++]) !== DELIMITER_END) {
        result.push(c)
    }

    return Buffer.from(result)
}

function string(buf, ctx) {
    let len = []

    while (ctx.position < buf.length) {
        let c = buf[ctx.position++]

        if (c !== DELIMITER) {
            len.push(c)
        } else {
            let strLen = parseInt(Buffer.from(len).toString('utf8'))
            return buf.slice(ctx.position, (ctx.position += strLen))
        }
    }
}

function list(buf, ctx) {
    let result = []
    let c

    while ((c = buf[ctx.position]) !== DELIMITER_END) {
        result.push(next(buf, ctx))
    }

    ctx.position++

    return result
}

function dictionary(buf, ctx) {
    let result = {}
    let c

    while ((c = buf[ctx.position]) !== DELIMITER_END) {
        result[string(buf, ctx)] = next(buf, ctx)
    }

    ctx.position++

    return result
}

function next(buf, ctx) {
    let c = buf[ctx.position++]

    switch (c) {
        case INTEGER_BEGIN:
            return integer(buf, ctx)

        case LIST_BEGIN:
            return list(buf, ctx)

        case DICTIONARY_BEGIN:
            return dictionary(buf, ctx)

        default:
            ctx.position--
            return string(buf, ctx)
    }
}

function decode(input) {
    return next(input, { position: 0 })
}

module.exports = decode
