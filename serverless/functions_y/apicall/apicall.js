const fetch = require('node-fetch')


exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  
  let response
  try {
    if (body.type == "POST") {
      response = await fetch(body.url,{
        method: "POST",
        headers: body.headers,
        body: JSON.stringify(body.body)
      })
    }
    else if(body.type == "GET"){
      response = await fetch(body.url)
    }
    
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify({"body": data})
  }
}
