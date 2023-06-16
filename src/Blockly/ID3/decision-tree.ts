import _ from 'lodash';

/**
 * Types that the Node can be applied to. Either its a decision or its a leaf.
 */
export const NODE_TYPES = {
  DECISION: 'decision',
  LEAF: 'leaf'
}

/**
 * This Method will create a tree based on the ID3 algorithm.
 * The Source Code is a modified Version of the npm Module https://github.com/serendipious/nodejs-decision-tree.
 * I modified it the way I needed it to be. 
 * 
 * @param data Table which holds the Records
 * @param target The Decision to make
 * @param features Features that influence the decision
 * @returns JSON Object of the tree created by the ID3 Algorithm
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
  let remainingFeatures = _.without(features, bestFeatureName);
  let possibleValues = _.uniq(_.map(data, bestFeatureName));

  let node: any = {
    value: bestFeatureName,
    type: NODE_TYPES.DECISION
  };

  _.forEach(possibleValues, (featureVal: any) => {
    const featureValDataSample = data.filter((dataRow: any) => dataRow[bestFeatureName] === featureVal);

    node[featureVal] = createTree(featureValDataSample, target, remainingFeatures);
  });

  return node;
}

/**
 * This Method calculates the Entropy of a Dataset.
 * 
 * @param vals Class labels of the Decision
 * @returns Entropy of the Dataset
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
 * This Method calculates the Information Gain for a single feature.
 * 
 * @param data Table which holds the Records
 * @param target The Decision to make
 * @param feature Feature to calculate the gain for
 * @returns Information Gain for the feature
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
 * This Method calculates the Feature with the most Information Gain. 
 * 
 * @param data Table which holds the Records
 * @param target The Decision to make
 * @param features Features that influence the decision
 * @returns JSON Object containing the Feature name and gain of the feature with the most gain
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
 * This Method calculates the Probability that the value will arrive
 * 
 * @param value The value to calc the probability from
 * @param list The complete Set to calc the prob based on
 * @returns The Probability of the value to the list
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
 * This Method calculates the log2 of n.
 * 
 * @param n The parameter to calc the log2 from
 * @returns log2 of n
 */
export function log2(n: any) {
  return Math.log(n) / Math.log(2);
}

/**
 * This Method calculates the Element which occurs the most
 * 
 * @param list List of which the Element should be selected from
 * @returns Retuns the most common element
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
