# Ski Din Calculator API

URL:

```
https://nigrpszsh3.execute-api.us-east-1.amazonaws.com/getdin/ski-din-calculator
```

Use the Ski Din calculator to determine what DIN setting (release tension) to set your ski bindings. USE AT YOUR OWN RISK. The algorithm uses the 2016/17 Marker DIN chart to calculate the DIN based on skier parameters (height, weight, age, boot sole length, type).

## GET /api/din
Uses URL query parameters in the form of a query string. Order does NOT matter, but all parameters are required.

Request Parameters:

```
units: 'standard'/'metric'
type: 0-4
hieght: [height in inches/cm]
weight: [weight in lbs/kgs]
age: [age]
bsl: [boot sole length in mm]
```

Response.data Object:

```
{
  units: 'standard',
  type: [skier type],
  height: [height in inches],
  weight: [weight in lbs],
  age: [age],
  bsl: [boot sole length in mm],
  skierCode: [skier code],
  din: [DIN setting]
}
```