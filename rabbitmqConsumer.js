/* currently rabbit mq publisher and consumer are in same module and container. Future plan
   is to move consumer to another container (for example docker) written in Java for load balancing purpose.
*/
const amqp = require("amqplib");
let io = require('./socket')

const url = "amqp://rabbitmq:5672";
const queueName = "jobs";

consumeMessage();

async function consumeMessage(){
    try{
        console.log("Rabbit Mq Consumer consumeMessage");
      
        // await promise
        const connection = await amqp.connect(url);

        //can create multiple channels in one connection
        const channel = await connection.createChannel();

        // this will create queue if it is not on server, durable false mean will not save on disk and in case of power failure
        // messages will be lost
        const jobQ = await channel.assertQueue(queueName, {durable: true});  
        
        channel.consume(queueName, message => {
            console.log("Rabbit Mq Consumer consuming Message");
            const input = JSON.parse(message.content.toString());
            console.log(input);
           
            //emit to interested clients
            io.socket.emit("updatedJob",input);

            //after doing all processing ack so that rabbit mq server will remove the message
            channel.ack(message);

        })
        console.log("Waiting for messages");

    } catch (ex) {
        console.error(ex);
    }
}