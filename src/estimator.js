/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  let estimatedFactor;
  const time = data.timeToElapse;
  const impact = {};
  const severeImpact = {};
  if ((data.periodType) === 'days') {
    estimatedFactor = Math.floor((time / 3));
  } else if ((data.periodType) === 'weeks') {
    estimatedFactor = Math.floor(((7 * time) / 3));
  } else if ((data.periodType) === 'months') {
    estimatedFactor = Math.floor(((30 * time) / 3));
  }
  impact.currentlyInfected = ((data.reportedCases) * 10);
  severeImpact.currentlyInfected = ((data.reportedCases) * 50);
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** estimatedFactor));
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** estimatedFactor));
  const result = {
    data,
    impact,
    severeImpact
  };
  console.log(result);
  return result;
};

export default covid19ImpactEstimator;
