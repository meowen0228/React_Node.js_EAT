import { createClient } from 'redis';
import { sign } from 'jsonwebtoken';
import { ILogin } from 'src/type';

const CreateToken = async (data: ILogin) => {
  try {
    const token = sign(data, 'secret');

    // redis port = 6379
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.set(data.userName, token);

    // set key timeout
    // await client.expire(data.userName, 600);

    return token;
  } catch (err) {
    return err;
  }
};

export default CreateToken;
