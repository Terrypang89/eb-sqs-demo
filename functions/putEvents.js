const EventBridge = require("aws-sdk/clients/eventbridge");
const Event_BUS_NAME = process.env.EventBusName;

let eventbridge = new EventBridge();

module.exports.handler = async (event) => {
    let body = JSON.parse(event.body)
    // putEvents to eventbridge
    var entry = {
        EventBusName: Event_BUS_NAME,
        Detail: JSON.stringify({
            vehicleNo: body.vehicleNo, 
            NIC: body.nic
        }),
        Source: "fuel-app",
        DetailType: "user-signup"
    };
    try {
        let output = await eventbridge.putEvents({ Entries: [entry]}).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(output)
        }
    } catch(err) {
        console.log(err);
    }    
}