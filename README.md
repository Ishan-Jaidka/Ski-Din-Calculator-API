# Ski Din Calculator API

Use the Ski Din calculator API to determine what DIN setting (release tension) to set your ski bindings. USE AT YOUR OWN RISK. The algorithm uses the 2016/17 Marker DIN chart to calculate the DIN based on skier parameters (height, weight, age, boot sole length, type).

### URL:

```
https://s2nsl6jo8i.execute-api.us-east-1.amazonaws.com/dincalc/calculate
```

## GET Request

Uses URL query parameters in the form of a query string. Order does NOT matter, but all parameters are required.

### Request Parameters:

```
units: 'standard' || 'metric'
type: 0-4
height: [height in inches/cm]
weight: [weight in lbs/kgs]
age: [age]
bsl: [boot sole length in mm]
```

### Sample Request:

```
https://s2nsl6jo8i.execute-api.us-east-1.amazonaws.com/dincalc/calculate?units=standard&type=2&height=72&weight=160&age=69&bsl=315
```

### Response.data Object:

```
{
  units: 'standard',
  type: [skier type],
  height: [height in inches],
  weight: [weight in lbs],
  age: [age],
  bsl: [boot sole length in mm],
  skierCode: [skier code],
  din: [DIN setting],
  message: [error message],
  fail: true || false
}
```

### Error Handling:

Each query parameter has a valid range:

```
Units: 'standard' || 'metric'
Type: 0-4
Height: 24-120 inches
Weight: 22-2000 lbs
Age: 1-200
Boot Sole Length (BSL): 165-405 mm
```

If invalid query parameters are used, access the error message using the following.

```
error.response.data
```
