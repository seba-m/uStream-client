import { useState, useEffect } from "react";

import { Spinner } from "../../components/Spinner";

import GeneralService from "../../services/General.service";
import { LandingCard } from "./LandingCard";

export function LandingGrid() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GeneralService.getTopStreamers().then((result) => {
            setData(result);
            console.log(result)
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

  //if (!data) return null;

  return (
    <>
        {
            data.map((stream) => (
                <LandingCard key={stream.username} stream={stream} />
            ))
        }
    </>
  );
}
