import { createClient } from 'redis'
import { promisify } from 'util'

const client = createClient(process.env.REDIS_URL)
const rsmq = new RedisSMQ( {client: client,  realtime: true, ns: "rsmq", password: process.env.REDIS_PASSS} );
export default {
  ...client,
  rsmq,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
}