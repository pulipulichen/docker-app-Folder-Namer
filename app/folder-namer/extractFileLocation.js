const extractGPS = require('./extractGPS')
const getLocation = require('./getLocation')

async function extractFileLocation(filePath) {
    const { latitude, longitude } = extractGPS(filePath);

    if (!latitude) {
        return null
    }

    const result = await getLocation(latitude, longitude)
    return result
}

module.exports = extractFileLocation;