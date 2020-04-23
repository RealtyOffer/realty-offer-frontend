import React from 'react';

import { IndexPageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry, getAsset }: { entry: any; getAsset: Function }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <IndexPageTemplate
        heroImage={getAsset(data.heroImage)}
        title={data.title}
        heroHeading={data.heroHeading}
        heroSubheading={data.heroSubheading}
        mainpitch={data.mainpitch}
        heroCTALink={data.heroCTALink}
        heroCTAText={data.heroCTAText}
      />
    );
  }
  return <div>Loading...</div>;
};

export default IndexPagePreview;
