const axios = require('axios');

async function getLocation(lat, lon) {
  
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'YourApp/1.0 (your@email.com)' }
        });
        const data = response.data;
        
        let city = data.address.city || data.address.town || data.address.village || '';
        let county = data.address.county || '';
        let landmark = data.display_name;

        return {
            city,
            county,
            landmark
        };
    } catch (error) {
        return { error: '請求錯誤', details: error.message };
    }
}

module.exports = getLocation