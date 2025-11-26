const accessKey = process.env.API_ACCESS_KEY;

async function sendRequest(url, method) {
  const options = {
    method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessKey}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to get data: ${response.statusText}`);
  }

  return await response.json();
}

async function sendGETRequest(url) {
  return await sendRequest(url, 'GET');
}

module.exports = {
  sendGETRequest
}