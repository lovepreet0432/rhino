import React,{ useMemo } from "react";
import {
  HomeBanner,
  Service,
  FeatureSection,
  Integrations,
  Scanner,
} from "../components/home";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from 'react-redux';
import { HomePageStyle } from "../assets/css/pagesStyle";

const HomePage = () => {
  document.title = "Home - Rhinolister";
  const home = useSelector(state => state.home);
  const memoizedHome = useMemo(() => home, [home]);
  
  if (!memoizedHome.home) {
    return (
      <HomePageStyle className='homepage-loader'>
        <div className="loader-container">
          <TailSpin height={80} width={80} />
        </div>
      </HomePageStyle>
    )
  }

   // Destructure home for cleaner code
   const { heading, content, scanContent, services, featureContent, shopify, ebay, amazon, hibid, whatnot } = memoizedHome.home;

  return (
    <>
      <HomeBanner heading={heading} content={content} />
      <Scanner content={scanContent} />
      <Service services={services} />
      <FeatureSection content={featureContent} />
      <Integrations shopifyList={shopify} ebayList={ebay} amazonList={amazon} hibidList={hibid} whatnotList={whatnot} />
    </>
  );
  
};

export default HomePage;