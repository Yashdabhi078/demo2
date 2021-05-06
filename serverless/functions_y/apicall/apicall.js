const fetch = require('node-fetch')


exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  
  let response
  try {
    response = await fetch(body.url,{
      method: body.type,
      headers: body.headers,
      body: JSON.stringify(body.body)
    })
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
  const y = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: y
    })
  }
}
