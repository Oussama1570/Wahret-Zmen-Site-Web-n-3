import React from "react";
import { useTranslation } from "react-i18next";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import News from "./News";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-center text-2xl font-bold">{t("home")}</h1>
      <Banner />
      <TopSellers />
      <News />
    </>
  );
};

export default Home;
