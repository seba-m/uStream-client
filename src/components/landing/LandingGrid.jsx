import { useState, useEffect } from "react";

import { Spinner } from "../../components/Spinner";

import GeneralService from "../../services/General.service";
import { LandingCard } from "./LandingCard";

import styles from "./LandingGrid.module.scss";

import InfiniteScroll from 'react-infinite-scroll-component';

export function LandingGrid() {
    const [streams, setStreams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        GeneralService.getTopStreamers(page).then((data) => {
            setStreams(prevStreams => prevStreams.concat(data.streams));
            setHasMore(data.currentPage < data.totalPages);
            setIsLoading(false);
        });
    }, [page]);

    if (isLoading) {
        return <Spinner />;
    }

  //if (!streams) return null;

  return (
    <>
          <InfiniteScroll
              dataLength={streams.length}
              hasMore={hasMore}
              next={() => setPage((prevPage) => prevPage + 1)}
              //height={"calc(100vh - 10rem)"}
              style={{ overflow: 'hidden' }}
              loader={<Spinner />}
          >
              <div className={styles.streamsContainer}>
                  {streams.map((stream) => {
                      return <LandingCard key={stream.userName} stream={stream} />;
                  })}
              </div>
          </InfiniteScroll>
    </>
  );
}
