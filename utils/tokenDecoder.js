const tokenDecoder = (req) => {
    const token = req.headers.authorization.split(' ')[1]
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = tokenDecoder