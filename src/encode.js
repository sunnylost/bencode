function integer(int) {
    return `i${int}e`
}

function string(str) {
    return `${str.length}:${str}`
}

function list(arr) {
    return 'l' + arr.map(v => encode(v)).join('') + 'e'
}

function dictionary(obj) {
    return (
        'd' +
        Object.entries(obj)
            .map(([k, v]) => {
                return string(k) + encode(v)
            })
            .join('') +
        'e'
    )
}

function encode(input) {
    let type = typeof input
    let isArray = Array.isArray(input)

    if (isArray) {
        return list(input)
    } else if (type === 'string') {
        return string(input)
    } else if (type === 'number') {
        return integer(input)
    } else {
        return dictionary(input)
    }
}

module.exports = encode
