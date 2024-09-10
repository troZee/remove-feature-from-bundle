import React from 'react';

type HomeScreenComponent = {
  HomeScreen: () => React.JSX.Element;
};

function HomeScreen() {
  const path =
    process.env.FEATURE_A === 'true'
      ? './HomeScreen.featurea'
      : './HomeScreen.featureb';

  if (process.env.FEATURE_A === 'true' && process.env.FEATURE_B === 'true') {
    // here we can change our default Home Screen if needed
  }

  const {HomeScreen: Home}: HomeScreenComponent = require(path);

  return <Home />;
}
export {HomeScreen};
