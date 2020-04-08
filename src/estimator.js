const covid19ImpactEstimator = (data) => {
  const { period, timeToProceed, reportedCases } = data;
  const currentlyInfectedNonExpert = reportedCases * 10;
  // HMS/MITGH report cases
  const currentlyInfectedByExpert = reportedCases * 50;
  let estimateMultiplier;
  if (period === 'weeks') {
    estimateMultiplier = timeToProceed * 7;
  } else if (period === 'months') {
    estimateMultiplier = timeToProceed * 30;
  } else {
    estimateMultiplier = timeToProceed;
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
