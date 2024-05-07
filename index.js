import { createClient, createCluster } from 'redis';
import express from 'express';

// const client = await createClient(6380-1)
//     .on('error', err => console.log('Redis Client Error', err))
//     .connect();

    const client = await createClient({
        // username: 'default', // use your Redis user. More info https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/
        // password: 'secret', // use your password here
        // socket: {
        //     host: 'my-redis.cloud.redislabs.com',
        //     port: 6379,
        //     tls: true,
            // key: readFileSync('./redis_user_private.key'),
            // cert: readFileSync('./redis_user.crt'),
            // ca: [readFileSync('./redis_ca.pem')]
        // }
    })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

// const client = createClient({
//     url: 'redis://alice:foobared@awesome.redis.server:6380'
//  });
// const cluster = createCluster({
//     rootNodes: [
//         {
//             url: 'redis://127.0.0.1:16379'
//         },
//         {
//             url: 'redis://127.0.0.1:16380'
//         },

//     ]
// });

const app = express();

// const client = await createClient({
//     url: 'redis://alice:foobared@awesome.redis.server:6380'
//   })
//   .on('error', err => console.log('Redis Client Error', err))
//   .connect();

// await client.connect();
// await cluster.connect();

app.listen(8000, async () => {

    // await cluster.set('foo', 'bar');
    // const value = await cluster.get('foo');
    // console.log(value); // returns 'bar'

    // await cluster.quit();
    // console.log(`App is running at 8000`);

    // string data
    await client.set('key', 'value1');
    const string = await client.get('key');
    console.log("string", string);

    // hash data
    await client.hSet('user-session:123', {
        name: 'john',
        surname: 'smith',
        company: 'redis',
        age: 29
    });
    let hash = await client.hGetAll('user-session:123');
    console.log("hash", hash);


})

