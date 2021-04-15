import React, { Component } from 'react';
import NewsItem from './NewsItem';

const NewsList = (props) => (
  <div>
    <div className="gx-flex-row gx-mb-3">
      <h4>TRENDING NEWS</h4>
      <a className="gx-ml-auto"><u>VIEW ALL</u></a>
    </div>
    {props.newsList.map((news) => <NewsItem key={news.id} index={news.id} data={news} />)}
  </div>
);

export default NewsList;
