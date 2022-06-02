import axios from 'axios';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-20943582.okta.com/oauth2/default',
  clientId: '0oa2pqe5iik6wUL285d7',
  redirectUri: `http://localhost:8000/callback`,
});

const ensureAuthenticated = oidc.ensureAuthenticated();

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    ensureAuthenticated(req, res, result => {
      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  });

  const issResponse = await axios.get('http://api.open-notify.org/iss-now.json');
  const position = [issResponse.data.iss_position.longitude, issResponse.data.iss_position.latitude, Object.keys(req.rawHeaders)];
  res.send(position);
}