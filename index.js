const axios = require('axios')
const cheerio = require('cheerio')


async function fetchDayOffData() {
  try {
    // Fetch the HTML of the page
    const { data } = await axios.get('https://tracker.day-off.app/auth/login');
    const $ = cheerio.load(data);
    console.log($)
    // Example: Extract and print the day off data
    $('.day-off-item').each((index, element) => {
      const date = $(element).find('.date').text();
      const reason = $(element).find('.reason').text();
      console.log(`Date: ${date}, Reason: ${reason}`);
    });
  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}

fetchDayOffData();
