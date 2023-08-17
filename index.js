const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URLs provided' });
  }

  try {
    

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
async function fetchNumbersFromURL(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching numbers from ${url}:`, error.message);
    return [];
  }
}

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URLs provided' });
  }

  const uniqueNumbers = new Set();

  const promises = urls.map(async (url) => {
    const numbers = await fetchNumbersFromURL(url);
    numbers.forEach((number) => uniqueNumbers.add(number));
  });

  await Promise.all(promises);

  const mergedNumbers = [...uniqueNumbers].sort((a, b) => a - b);

  res.json({ numbers: mergedNumbers });
});
