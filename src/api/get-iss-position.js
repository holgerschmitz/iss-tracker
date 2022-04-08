import axios from 'axios';
export default async function handler(req, res) {
  const issResponse = await axios.get('http://api.open-notify.org/iss-now.json');
  const position = [issResponse.data.iss_position.longitude, issResponse.data.iss_position.latitude];
  res.send(position);
}