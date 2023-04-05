const assert = require('assert');
const _ = require('lodash');

export const NODE_TYPES = {
  DECISION: 'decision',
  LEAF: 'leaf'
}

export class DecisionTree {
  data: any
  target: string
  features: string[]

  constructor(
    data: any,
    target: string,
    features: string[],
  ) {
    this.data = data
    this.target = target
    this.features = features
  }

  createTree(
    data: any = this.data,
    target: string = this.target,
    features: string[] = this.features,
  ) {
    let targets = _.uniq(_.map(data, target));
    if (targets.length == 1) {
      return {
        type: NODE_TYPES.LEAF,
        value: targets[0],
      };
    }

    if (features.length == 0) {
      let topTarget = this.mostCommon(targets);
      return {
        type: NODE_TYPES.LEAF,
        value: topTarget,
      };
    }

    let bestFeature = this.maxGain(data, target, features);
    let bestFeatureName: any = bestFeature.name;
    let bestFeatureGain = bestFeature.gain;
    let remainingFeatures = _.without(features, bestFeatureName);
    let possibleValues = _.uniq(_.map(data, bestFeatureName));

    let node: any = {
      value: bestFeatureName,
      type: NODE_TYPES.DECISION
    };

    _.forEach(possibleValues, (featureVal: any) => {
      const featureValDataSample = data.filter((dataRow: any) => dataRow[bestFeatureName] == featureVal);
      const featureValDataSampleSize = featureValDataSample.length;

      node[featureVal] = this.createTree(featureValDataSample, target, remainingFeatures);
    });

    return node;
  }

  entropy(vals: any) {
    let uniqueVals = _.uniq(vals);
    let probs = uniqueVals.map((x: any) => {
      return this.prob(x, vals)
    });

    let logVals = probs.map((p: any) => {
      return -p * this.log2(p)
    });

    return logVals.reduce(function (a: any, b: any) {
      return a + b
    }, 0);
  }

  gain(data: any, target: string, feature: string) {
    let attrVals = _.uniq(_.map(data, feature));
    let setEntropy = this.entropy(_.map(data, target));
    let setSize = _.size(data);

    let entropies = attrVals.map((n: any) => {
      let subset = data.filter(function (x: any) {
        return x[feature] === n
      });

      return (subset.length / setSize) * this.entropy(_.map(subset, target));
    });

    let sumOfEntropies = entropies.reduce(function (a: any, b: any) {
      return a + b
    }, 0);

    return setEntropy - sumOfEntropies;
  }

  maxGain(data: any, target: string, features: string[]) {
    let maxGain, maxGainFeature;
    for (let feature of features) {
      const featureGain = this.gain(data, target, feature);
      if (!maxGain || maxGain < featureGain) {
        maxGain = featureGain;
        maxGainFeature = feature;
      }
    }
    return { gain: maxGain, name: maxGainFeature };
  }

  prob(value: any, list: any) {
    let occurrences = _.filter(list, function (element: any) {
      return element === value
    });

    let numOccurrences = occurrences.length;
    let numElements = list.length;
    return numOccurrences / numElements;
  }

  log2(n: any) {
    return Math.log(n) / Math.log(2);
  }

  mostCommon(list: any) {
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
}
