const https = require('https');

function getAccessToken(login, password){
  return new Promise(resolve => {
        let options = {
          hostname: 'authentication.reseau-ges.fr',
          port: 443,
          path: '/oauth/authorize?client_id=skolae-app&response_type=token',
          method: 'GET',
          auth: `${login}:${password}`
        };

        callback = function(response){

            // For an odd reason I have to keep in order to be functionnal
            response.on('data', function(chunk){

            });

            response.on('end', function(){
                let token_unparsed = new URL(response.headers.location).hash;
                let key = token_unparsed.substring(token_unparsed.indexOf('=') + 1, token_unparsed.indexOf('&'));
                resolve(key.trim());
            });
        }

        let request = https.request(options, callback);
        request.end();
  });
}

function getAgenda(start_date, end_date, token){
  return new Promise(resolve => {
        let options = {
          hostname: 'services.reseau-ges.fr',
          port: 443,
          path: `/me/agenda?end=${end_date}&start=${start_date}`,
          method: 'GET',
          headers:{
            Authorization: ` Bearer ${token}`
          },
          json: true,
        };


        callback = function(response){

          let str;

            response.on('data', function(chunk){
              str += chunk;
            });

            response.on('end', function(){
              resolve(str);
            });
        }

        let request = https.request(options, callback);
        request.end();
  });
}
module.exports = {
  accessToken: getAccessToken,
  getAgenda: getAgenda
}
