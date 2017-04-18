export function getBMI(weight, height) {
  if (Number.isNaN(parseInt(weight, 10)) ||
      Number.isNaN(parseInt(height, 10))) {
    return false;
  }
  height /= 100;
  return (Math.round(weight / (height * height)));
}



export function getLeanBodyMass(bodyWeight, bodyFatPercentage) {

  if (typeof bodyWeight !== 'number' || typeof bodyFatPercentage !== 'number') {
    throw new Error(`invalid parameter. expected a number, but seen` + typeof bodyWeight + typeof bodyFatPercentage);
  }
  if (bodyFatPercentage > 100 || bodyFatPercentage < 1) {
    throw new Error("expected a number beetween 1 and 100");
  }

  return bodyWeight - (bodyWeight * (bodyFatPercentage / 100));
}
