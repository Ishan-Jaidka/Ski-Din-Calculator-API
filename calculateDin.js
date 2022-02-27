//returns DIN from Marker 2016/17 DIN chart if provided skier data (heweight, age, skier type, boot sole length)

var methods = {
    calculateDin: function(skier){
        let res = {
            'units': skier.units,
            'type': parseInt(skier.type),
            'height': parseInt(skier.height),
            'weight': parseInt(skier.weight),
            'age': parseInt(skier.age),
            'bsl': parseInt(skier.bsl),
            'skierCode': 'Z',
            'din': -1
        };
    
        const dinChart = [                                          //Skier Code:
            [0.75, 0.75, 0.75, 0,    0,    0,    0,    0],          //A
            [1,    0.75, 0.75, 0.75, 0,    0,    0,    0],          //B
            [1.5,  1.25, 1.25, 1,    0,    0,    0,    0],          //C
            [2,    1.75, 1.5,  1.5,  1.25, 0,    0,    0],          //D
            [2.5,  2.25, 2,    1.75, 1.5,  1.5,  0,    0],          //E
            [3,    2.75, 2.5,  2.25, 2,    1.75, 1.75, 0],          //F
            [0,    3.5,  3,    2.75, 2.5,  2.25, 2,    0],          //G
            [0,    0,    3.5,  3,    3,    2.75, 2.5,  0],          //H
            [0,    0,    4.5,  4,    3.5,  3.5,  3,    0],          //I
            [0,    0,    5.5,  5,    4.5,  4,    3.5,  3],          //J
            [0,    0,    6.5,  6,    5.5,  5,    4.5,  4],          //K
            [0,    0,    7.5,  7,    6.5,  6,    5.5,  5],          //L
            [0,    0,    0,    8.5,  8,    7,    6.5,  6],          //M
            [0,    0,    0,    10,   9.5,  8.5,  8,    7.5],        //N
            [0,    0,    0,    11.5, 11,   10,   9.5,  9],          //O
            [0,    0,    0,    0,    0,    12,   11,   10.5]        //holy shit
        ];
    
        //if metric, converts to standard units
        if(res.units === 'metric'){
            res.height /= 2.54;
            res.weight *= 2.205;
            res.units === 'standard';
        }
    
        //checks all data for valid inputs
        checkSkierType(res.type);
        checkAge(res.age);
        checkHeight(res.height);        
        checkWeight(res.weight);
        checkBsl(res.bsl);
    
        //skier code calculation based on height (+65 converts to ASCII value for capital letters)
        let hCode, wCode, skierCodeInt;
        if(res.height<59) hCode = 7;        //H
        else if(res.height<62) hCode = 8;   //I
        else if(res.height<66) hCode = 9;   //J
        else if(res.height<71) hCode = 10;  //K
        else if(res.height<77) hCode = 11;  //L
        else hCode = 12;                //M
    
        //skier code calculation based on weight;
        if(res.weight<30) wCode = 0;        //A
        else if(res.weight<39) wCode = 1;   //B
        else if(res.weight<48) wCode = 2;   //C
        else if(res.weight<57) wCode = 3;   //D
        else if(res.weight<67) wCode = 4;   //E
        else if(res.weight<79) wCode = 5;   //F
        else if(res.weight<92) wCode = 6;   //G
        else if(res.weight<108) wCode = 7;  //H
        else if(res.weight<126) wCode = 8;  //I
        else if(res.weight<148) wCode = 9;  //J
        else if(res.weight<175) wCode = 10; //K
        else if(res.weight<210) wCode = 11; //L
        else wCode = 12;                //M
    
        //Skier Code Int = minimum(skierCodeFromHeight, skierCodeFromWeight) adjusted for skierType
        skierCodeInt = Math.min(hCode, wCode) + res.type - 1;
    
        //adjusts skier code for age (if younger than 10 or older than 49)
        if(res.age<10 || res.age>49) skierCodeInt--;
    
        //Skier Code = character representation of skierCodeInt
        res.skierCode = String.fromCharCode(skierCodeInt + 65);
    
        //finds which column of the DIN chart is used when given the boot sole length
        let bslCol;
        if(skier.bsl<231) bslCol = 0;
        else if(skier.bsl<251) bslCol = 1;
        else if(skier.bsl<271) bslCol = 2;
        else if(skier.bsl<291) bslCol = 3;
        else if(skier.bsl<311) bslCol = 4;
        else if(skier.bsl<331) bslCol = 5;
        else if(skier.bsl<351) bslCol = 6;
        else bslCol = 7;
    
        //retrieves and returns the DIN from the DIN chart
        res.din = dinChart[parseInt(skierCodeInt)][parseInt(bslCol)];
    
        return res;
    
    
        function checkBsl(bsl){
            if(bsl<165 || bsl>405)
                throw new Error("Enter a valid boot sole length");
        }
    
        function checkWeight(weight){
            if(weight<22 || weight>2000)
                throw new Error("Enter a valid weight");
        }
        
        function checkHeight(height){
            if(height<24 || height>120)
                throw new Error("Enter a valid height");
        }
        
        function checkAge(age){
            if(age<1 || age>200)
                throw new Error("Enter a valid age");
        }
        
        function checkSkierType(type){
            if(type <0 || type >4)
                throw new Error("Choose a valid Skier Type");
        }
    }
};

module.exports = methods;