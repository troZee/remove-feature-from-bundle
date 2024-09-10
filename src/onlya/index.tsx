import React from 'react';

type FeatureComponent = {
  Feature: () => React.JSX.Element;
};

function Feature() {
  const path =
    process.env.FEATURE_A === 'true' ? './Feature.featurea' : './Feature';

  const {Feature: FeatureComponent}: FeatureComponent = require(path);

  return <FeatureComponent />;
}
export {Feature};
