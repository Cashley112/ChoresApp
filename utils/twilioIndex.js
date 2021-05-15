var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = new twilio('AC1e10b459b5695873457927b45f4e4b44', '07147b4e588baba35c293314c68be1d0');


// Send the text message.
client.messages.create({
  to: '804-651-2612',
  from: '+12108719474',
  body: 'Yo let me know if you got this text'
}).then(message => console.log(message.sid));