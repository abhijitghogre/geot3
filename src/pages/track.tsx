import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";

const Home: NextPage = () => {

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  });

  const [error, setError] = useState("");

  const router = useRouter();
  const locationMutation = api.location.save.useMutation();

  useEffect(() => {
    if (!router.query.id) return;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        locationMutation.mutate({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
          id: router.query.id as string
        });
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }

  }, [locationMutation, router.query.id]);

  if (error) return <div>{error}</div>;

  return (
    <>
      Tracking your location
      <br />
      <br />
      {position.lat} {position.lng}
    </>
  );
};

export default Home;
