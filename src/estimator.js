const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region
  } = data;
  let factor;
  let period;

  if (periodType === 'days') {
    factor = Math.floor(timeToElapse / 3);
    period = timeToElapse;
  } else if (periodType === 'weeks') {
    factor = Math.floor((timeToElapse * 7) / 3);
    period = timeToElapse * 7;
  } else {
    factor = Math.floor((timeToElapse * 30) / 3);
    period = timeToElapse * 30;
  }
  // impact estimations
  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** factor);
  const casesByRequestedTime = Math.ceil(impactInfectionsByRequestedTime * 0.15);
  const totalBeds = Math.ceil(totalHospitalBeds * 0.35);
  const impactHospitalBedsByRequestedTime = Math.ceil(totalBeds - casesByRequestedTime);
  const impactCasesForICUByRequestedTime = Math.floor(impactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.floor(impactInfectionsByRequestedTime
                                                  * 0.02);
  const impactDollarsInFlight = Math.floor((impactInfectionsByRequestedTime
                                    * region.avgDailyIncomePopulation
                                    * region.avgDailyIncomeInUSD) / period);

  // severe impact estimations
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.ceil(severeImpactInfectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.ceil(totalBeds - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime
                                              * 0.02);
  const dollarsInFlight = Math.floor((severeImpactInfectionsByRequestedTime
                            * region.avgDailyIncomePopulation
                            * region.avgDailyIncomeInUSD) / period);


  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: casesByRequestedTime,
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight
  };

  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
