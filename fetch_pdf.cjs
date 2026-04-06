const fs = require('fs');
const https = require('http'); // the URL is http://
const pdf = require('pdf-parse');

https.get('http://www.administration.education.gov.tn/2016-10-26/circulaire_81102016.pdf', res => {
  const data = [];
  res.on('data', c => data.push(c));
  res.on('end', () => {
    pdf(Buffer.concat(data)).then(t => console.log(t.text.substring(0, 3000))).catch(console.error);
  });
});
