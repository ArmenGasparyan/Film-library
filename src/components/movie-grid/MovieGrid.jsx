import React, { useCallback, useEffect, useState } from "react";
import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import { useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from '../input/Input'
import { useHistory } from "react-router-dom";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  console.log(category);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (category) {
          case "movie":
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
          page: page + 1
      };
      switch (category) {
        case "movie":
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1)
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword}/>
      </div>
      <div className="movie-grid">
        {items.length ? (
          <>
            {items.map((item, i) => {
              return <MovieCard category={category} item={item} key={i} />;
            })}
          </>
        ) : (
          <div className="movie-loading">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
      {page < totalPage ? (
        <div className="move-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = props => {

  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(
      () => {
          if (keyword.trim().length > 0) {
              history.push(`/${category[props.category]}/search/${keyword}`);
          }
      },
      [keyword, props.category, history]
  );

  useEffect(() => {
      const enterEvent = (e) => {
          e.preventDefault();
          if (e.keyCode === 13) {
              goToSearch();
          }
      }
      document.addEventListener('keyup', enterEvent);
      return () => {
          document.removeEventListener('keyup', enterEvent);
      };
  }, [keyword, goToSearch]);

  return (
      <div className="movie-search">
          <Input
              type="text"
              placeholder="Enter keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="small" onClick={goToSearch}>Search</Button>
      </div>
  )
}

export default MovieGrid;