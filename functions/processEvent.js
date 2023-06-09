

module.exports.handler = async (event) => {
    let records = event.Records;
    let batchItemsFailures = [];

    if(records.length) {
        for(const record of records) {
            try{
                const parsedBody = JSON.parse(record.body);
                // console.log(parsedBody);
                if (typeof parsedBody.detail.vehicleNo !== 'string') {
                    throw new Error("vechicle Number must be a string")
                }
                console.log("processing vehicle details " + parsedBody.detail.vehicleNo);
                console.log("processing is successful " + record.messageId);
            }catch (err) {
                batchItemsFailures.push({
                    itemIdentifier: record.messageId,
                });
            }
        }
    }
    return {batchItemsFailures};
};