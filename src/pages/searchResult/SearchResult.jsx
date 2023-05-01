import React, { useState, useEffect } from "react";
import { matchRoutes, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

import "./style.scss";

const SearchResult = () => {
	const [data, setData] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [loading, setLoading] = useState(false);
	const { query } = useParams();

	const fetchInitialData = () => {
		setLoading(true);
		fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}
	 `).then((res) => {
			setData(res);
			setPageNum((prev) => prev + 1);
			setLoading(false);
		});
	};

	const fetchNextPageData = () => {
		fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}
	 `).then((res) => {
			if (data?.results) {
				setData({
					...data,
					results: [...data?.results, ...res.results],
				});
			} else {
				setData(res);
			}
			setPageNum((prev) => prev + 1);
		});
	};

	useEffect(() => {
		setPageNum(1);
		fetchInitialData();
	}, [query]);

	return (
		<div className="searchResultsPage">
			{loading && <Spinner initial={true} />}

			{!loading && (
				<ContentWrapper>
					{data?.results?.length > 0 ? (
						<>
							<div className="pageTitle">
								{`Search ${
									data?.total_results > 1 ? "Results" : "Result"
								} on '${query}'`}
							</div>

							<InfiniteScroll
								className="content"
								dataLength={data?.results.length || []}
								next={fetchNextPageData}
								hasMore={pageNum <= data?.total_pages}
								loader={<Spinner />}
							>
								{data?.results.map((item, index) => {
									if (item.media_type === "person") return;

									return (
										<MovieCard key={index} data={item} fromSearch={true} />
									);
								})}
							</InfiniteScroll>
						</>
					) : (
						<span className="resultNotFound">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
									marginBottom: 20,
								}}
							>
								<img
									src={noResults}
									alt="no result"
									style={{
										height: 600,
										width: 600,
									}}
								/>
								<span
									style={{
										color: "white",
									}}
								>
									Oops! Result not Found
								</span>
							</div>
						</span>
					)}
				</ContentWrapper>
			)}
		</div>
	);
};

export default SearchResult;
