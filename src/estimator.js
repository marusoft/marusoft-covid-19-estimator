const covid19ImpactEstimator = (data) => {
  const { periodType, timeToElapse, reportedCases } = data;
  const currentlyInfectedNonExpert = reportedCases * 10;
  // HMS/MITGH report cases
  const currentlyInfectedByExpert = reportedCases * 50;
  let estimateMultiplier;
  if (periodType === 'weeks') {
    estimateMultiplier = timeToElapse * 7;
  } else if (periodType === 'months') {
    estimateMultiplier = timeToElapse * 30;
  } else {
    estimateMultiplier = timeToElapse;
  }
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedNonExpert,
      infectionsByRequestedTime: currentlyInfectedNonExpert * 2 ** (estimateMultiplier / 3)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedByExpert,
      infectionsByRequestedTime: currentlyInfectedByExpert * 2 ** (estimateMultiplier / 3)
    }
  };
};

export default covid19ImpactEstimator;
