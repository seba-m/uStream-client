import React, { useState, useEffect } from 'react';

import { Spinner } from "../components/Spinner";
import { LandingCard } from "../components/landing/LandingCard";
import GeneralService from '../services/General.service';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from "./Following.module.scss";

export function Following() {
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GeneralService.getFollowing(page).then((data) => {
      setStreams(prevStreams => prevStreams.concat(data.streams));
      setHasMore(data.currentPage < data.totalPages);
      setIsLoading(false);
    });
  }, [page]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className={styles.title}>Followed channels</h1>
      <InfiniteScroll
        dataLength={streams.length}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        height={"calc(100vh - 10rem)"}
        loader={<Spinner />}
      >
        <div className={styles.streamsContainer}>
          {streams && streams.map((stream) => {
            return <LandingCard key={stream.userName} stream={stream} />;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}