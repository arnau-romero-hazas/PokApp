export const extractPayloadFromJWT = token => {
    const fromIndex = token.indexOf('.') + 1
    const toIndex = token.lastIndexOf('.')
    const payloadB64 = token.slice(fromIndex, toIndex)
    const payloadJSON = atob(payloadB64)
    const payload = JSON.parse(payloadJSON)

    return payload
}