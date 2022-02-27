const CalculateDIN = require('./calculateDin.js');

exports.handler = async (event) => {
    try{
        if(event.queryStringParameters == undefined){
            console.log("No query string parameters found");
            return {
                statusCode: 400,
                headers:{
                    "Access-Control-Allow-Origin": "*"
                },
                body: "No query string parameters found"
            };
        }
        let skier = {
            units: event.queryStringParameters.units,
            type: (event.queryStringParameters.type),
            height: (event.queryStringParameters.height),
            weight: (event.queryStringParameters.weight),
            age: (event.queryStringParameters.age),
            bsl: (event.queryStringParameters.bsl)
        };
        console.log(`Incoming data: ${JSON.stringify(skier)}`);
        let status = 200;
        let message = 'Please enter: ';
        if(skier.units == '' || skier.units == undefined){
            status = 400;
            message += 'units, ';
        }
        if(skier.units != 'standard' && skier.units != 'metric'){
            status = 400;
            message += 'valid units (\'standard\', \'metric\'), ';
        }
        if(skier.type == '' || skier.type == undefined){
            status = 400;
            message += 'type, ';
        }
        if(skier.type < 0 || skier.type > 4){
            status = 400;
            message += 'valid type (0-4,) ';
        }
        if(skier.height == '' || skier.height == undefined){
            status = 400;
            message += 'height, ';
        }
        if(skier.units == 'standard' && skier.height < 24){
            status = 400;
            message += 'valid height (24-120 in), ';
        }
        if(skier.units == 'standard' && skier.height > 120){
            status = 400;
            message += 'valid height (24-120 in), ';
        }
        if(skier.units == 'metric' && (skier.height/2.54) < 24){
            status = 400;
            message += 'valid height (61-305 cm), ';
        }
        if(skier.units == 'metric' && (skier.height/2.54) > 120){
            status = 400;
            message += 'valid height (61-305 cm), ';
        }
        if(skier.weight == '' || skier.weight == undefined){
            status = 400;
            message += 'weight, ';
        }
        if(skier.units == 'standard' && skier.weight < 22){
            status = 400;
            message += 'valid weight (22-2000 lb), ';
        }
        if(skier.units == 'standard' && skier.weight > 2000){
            status = 400;
            message += 'valid weight (22-2000 lb), ';
        }
        if(skier.units == 'metric' && (skier.weight*2.2) < 22){
            status = 400;
            message += 'valid weight (10-910 kg), ';
        }
        if(skier.units == 'metric' && (skier.weight*2.2) > 2000){
            status = 400;
            message += 'valid weight (10-910 kg), ';
        }
        if(skier.age == '' || skier.age == undefined){
            status = 400;
            message += 'age, ';
        }
        if(skier.age < 1 || skier.age > 200){
            status = 400;
            message += 'valid age (1-200), ';
        }
        if(skier.bsl == '' || skier.bsl == undefined){
            status = 400;
            message += 'bsl, ';
        }
        if(skier.bsl < 165 || skier.bsl > 405){
            status = 400;
            message += 'valid bsl (165-405), ';
        }
        if(status == 200){
            return returnResponse(status, CalculateDIN.calculateDin(skier));
        } else{
            skier.fail = true;
            skier.message = message;
            return returnResponse(400, skier);
        }
        
    }catch(e){
        return returnResponse(400, e);
    }
    
};

function returnResponse(statusCode, message){
    let response = {
        statusCode: statusCode,
        headers:{
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(message)
    };
    console.log(`Response: ${JSON.stringify(response)}`);
    return response;
}