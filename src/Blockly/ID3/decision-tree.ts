import _ from 'lodash';

/**
 * 
 */
export const NODE_TYPES = {
  DECISION: 'decision',
  LEAF: 'leaf'
}

/**
 * 
 * @param data 
 * @param target 
 * @param features 
 * @returns 
 */
export function createTree(
  data: any,
  target: string,
  features: string[],
) {
  let targets = _.uniq(_.map(data, target));
  if (targets.length === 1) {
    return {
      type: NODE_TYPES.LEAF,
      value: targets[0],
    };
  }

  if (features.length === 0) {
    let topTarget = mostCommon(targets);
    return {
      type: NODE_TYPES.LEAF,
      value: topTarget,
    };
  }

  let bestFeature = maxGain(data, target, features);
  let bestFeatureName: any = bestFeature.name;
  let bestFeatureGain = bestFeature.gain;
  let remainingFeatures = _.without(features, bestFeatureName);
  let possibleValues = _.uniq(_.map(data, bestFeatureName));

  let node: any = {
    value: bestFeatureName,
    gain: bestFeatureGain,
    type: NODE_TYPES.DECISION
  };

  _.forEach(possibleValues, (featureVal: any) => {
    const featureValDataSample = data.filter((dataRow: any) => dataRow[bestFeatureName] === featureVal);

    node[featureVal] = createTree(featureValDataSample, target, remainingFeatures);
  });

  return node;
}

/**
 * 
 * @param vals 
 * @returns 
 */
export function entropy(vals: any) {
  let uniqueVals = _.uniq(vals);
  let probs = uniqueVals.map((x: any) => {
    return prob(x, vals)
  });

  let logVals = probs.map((p: any) => {
    return -p * log2(p)
  });

  return logVals.reduce(function (a: any, b: any) {
    return a + b
  }, 0);
}

/**
 * 
 * @param data 
 * @param target 
 * @param feature 
 * @returns 
 */
export function gain(data: any, target: string, feature: string) {
  let attrVals = _.uniq(_.map(data, feature));
  let setEntropy = entropy(_.map(data, target));
  let setSize = _.size(data);

  let entropies = attrVals.map((n: any) => {
    let subset = data.filter(function (x: any) {
      return x[feature] === n
    });

    return (subset.length / setSize) * entropy(_.map(subset, target));
  });

  let sumOfEntropies = entropies.reduce(function (a: any, b: any) {
    return a + b
  }, 0);

  return setEntropy - sumOfEntropies;
}

/**
 * 
 * @param data 
 * @param target 
 * @param features 
 * @returns 
 */
export function maxGain(data: any, target: string, features: string[]) {
  let maxGain, maxGainFeature;
  for (let feature of features) {
    const featureGain = gain(data, target, feature);
    if (!maxGain || maxGain < featureGain) {
      maxGain = featureGain;
      maxGainFeature = feature;
    }
  }
  return { gain: maxGain, name: maxGainFeature };
}

/**
 * 
 * @param value 
 * @param list 
 * @returns 
 */
export function prob(value: any, list: any) {
  let occurrences = _.filter(list, function (element: any) {
    return element === value
  });

  let numOccurrences = occurrences.length;
  let numElements = list.length;
  return numOccurrences / numElements;
}

/**
 * 
 * @param n 
 * @returns 
 */
export function log2(n: any) {
  return Math.log(n) / Math.log(2);
}

/**
 * 
 * @param list 
 * @returns 
 */
export function mostCommon(list: any) {
  let elementFrequencyMap: any = {};
  let largestFrequency = -1;
  let mostCommonElement = null;

  list.forEach(function (element: any) {
    let elementFrequency = (elementFrequencyMap[element] || 0) + 1;
    elementFrequencyMap[element] = elementFrequency;

    if (largestFrequency < elementFrequency) {
      mostCommonElement = element;
      largestFrequency = elementFrequency;
    }
  });

  return mostCommonElement;
}
