function sumAll() {
  let initialPrediction = 0;

  // initial 500 to check how much is left to pay using monthly bill and energy monthly
  Solar500.outputs.forEach((item) => {
    initialPrediction += item.wh;
  })

  // monthly energy used
  let kwhConsumption = 443;

  // monthly electricty bill
  let monthlyBill = 120;

  // yearly energy used
  let kwhYear = kwhConsumption * 12;


  // divide initial by 1000 to convert from wh to kWh
  let solarSize = kwhYear / (initialPrediction / 1000) * 500;
  solarSize = Math.ceil(solarSize);

  // cost of kwh
  let costkWh = monthlyBill / kwhConsumption;

  let annualSolar = 0;

  // initial 500 to check how much is left to pay using monthly bill and energy monthly
  FinalSolar.outputs.forEach((item) => {
    annualSolar += item.wh;
  })

  // convert to kWh
  annualSolar = annualSolar / 1000;
  annualSolar = annualSolar * costkWh;

  let panel300Qty = Math.ceil(solarSize / 300);
  let panel500Qty = Math.ceil(solarSize / 500);

  let inverter1kwQty = Math.ceil(solarSize * 0.82 / 1000);
  let inverter2kwQty = Math.ceil(solarSize * 0.82 / 3000);

  let trees = Math.floor(solarSize * 180 / 7000);


  setReportData({
    outputs: FinalSolar.outputs,
    address: '16  Hawksmoor',
    cost: '144',
    kwh: '60',
    trees,
    initialPrediction,
    kwhConsumption,
    monthlyBill,
    kwhYear,
    solarSize,
    costkWh,
    annualSolar,
    panel300Qty,
    panel500Qty,
    inverter1kwQty,
    inverter2kwQty,
  })

}

export default sumAll;