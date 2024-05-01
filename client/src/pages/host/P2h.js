import React  from 'react';
import { PlaceOptions } from '../../components/PlaceOptions/PlaceOptions';
import { Helmet, HelmetProvider } from "react-helmet-async";

function P2h() {
  const title="HomeAway(Host)";
  const navigateLink="/host/P3h";
  return (
      <HelmetProvider>
          <Helmet>
              <title>Host</title>
          </Helmet>
          <PlaceOptions
          navigateLink={navigateLink}
          title={title}
          />
      </HelmetProvider>
  )

}

export default P2h;




