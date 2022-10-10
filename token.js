const express = require('express')
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');

const app = express()
const port = 3000

var minutesToAdd=5;
var currentDate = new Date();
var expireDate = new Date(currentDate.getTime() + minutesToAdd*60000);

const connectedAppClientId = "4c4fdb86-7920-449a-97ee-e1403dbcdf17";
const connectedAppSecretId = "c3fe5b7e-f35a-4e32-822f-6ca682f0c28d";
const connectedAppSecretKey = "2CXdVZ5Mg9BhsYPS0tH1QgVgFtWA3BfYOwrQIrtZXSw=";
const user = "tomas_10101995@hotmail.com";
var id = uuid4();

const toBase64 = obj => {
    
    const str = JSON.stringify (obj);   
    return Buffer.from(str).toString ('base64');
 };

 const replaceSpecialChars = b64string => {    
      return b64string.replace (/[=+/]/g, charToBeReplaced => {
        switch (charToBeReplaced) {
          case '=':
            return '';
          case '+':
            return '-';
          case '/':
            return '_';
        }
      });
    };

const header = {
    alg: 'HS256',
    typ: 'JWT',
    kid: connectedAppSecretId,
    iss: connectedAppClientId
  };
  const b64Header = toBase64 (header);
  const jwtB64Header = replaceSpecialChars(b64Header);

  const payload = {
    "iss": connectedAppClientId,
    "exp": expireDate,
    "jti": id,
    "aud": "tableau",
    "sub": user,
    "scp": ["tableau:views:embed", "tableau:metrics:embed", "tableau:views:embed_authoring"]
  };

const b64Payload = toBase64 (payload);
const jwtB64Payload = replaceSpecialChars (b64Payload);

const crypto = require ('crypto');
const createSignature =(jwtB64Header,jwtB64Payload,connectedAppSecretKey)=>{    
        let signature = crypto.createHmac ('sha256', connectedAppSecretKey);
        signature.update (jwtB64Header + '.' + jwtB64Payload);        
        signature = signature.digest ('base64');     
        signature = replaceSpecialChars (signature);
        return signature
    }    
    
    const signature= createSignature(jwtB64Header,jwtB64Payload,connectedAppSecretKey);
    const jsonWebToken = jwtB64Header + '.' + jwtB64Payload + '.' + signature;

app.get('/', (req, res) => {
  res.send(jsonWebToken)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})