/* eslint-disable */
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {

  const router = useRouter();

  const locationQuery = api.location.get.useQuery({
    id: router.query.id as string,
  });
  const utils = api.useContext();

  useEffect(() => {
    setInterval(() => {
      void (async () => {
        await utils.location.invalidate()
      })();
    }, 1000);
  }, [utils]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        Track {router.query.id}'s location
        <br/>
        {locationQuery.data?.lat} {locationQuery.data?.lng}
      </main>
    </>
  );
};

export default Home;
