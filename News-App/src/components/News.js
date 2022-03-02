import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  articles = [];
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: '3'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      laoding: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalized(this.props.category)} - News`;
  }
  capitalized = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }
  update = async (api) => {
    this.props.setProgress(0);
    this.setState({ laoding: true });
    this.props.setProgress(20);
    let data = await fetch(api);
    this.props.setProgress(50);
    let news_In_JSON = await data.json();
    this.props.setProgress(80);
    this.setState({ articles: news_In_JSON.articles, laoding: false });
    this.props.setProgress(100);
  }
  // nextPage = async () => {
  //   let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=561a2a00a9884871b99c22ef56fb171e&page=${this.state.page + 1}`;
  //   this.update(api);
  //   this.setState({ page: this.state.page + 1 });
  // }
  // prevPage = async () => {
  //   let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=561a2a00a9884871b99c22ef56fb171e&page=${this.state.page - 1}`;
  //   this.update(api);
  //   this.setState({ page: this.state.page - 1 });
  // }
  async componentDidMount() {
    let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=561a2a00a9884871b99c22ef56fb171e&page=${this.state.page}`;
    this.update(api);
  }
  fetchMoreData = async () => {
    let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=561a2a00a9884871b99c22ef56fb171e&page=${this.state.page + 1}`;
    let data = await fetch(api);
    let news_In_JSON = await data.json();
    this.setState({
      articles: this.state.articles.concat(news_In_JSON.articles), totalResults: news_In_JSON.totalResults
      , laoding: false, page: this.state.page + 1
    });
  }
  render() {
    return (
      <>
        <h1 className='container my-3 text-secondary text-centre d-flex justify-content-center'><u><b><i>Top {this.capitalized(this.props.category)} Headlines</i></b></u></h1>
        {/* {this.state.laoding && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}>
          <div className='container'>
            <div className="row">
              {
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title} description={element.description}
                        imageUrl={element.urlToImage} newsUrl={element.url} alt={element.title}
                        author={element.author} dated={element.publishedAt}
                        source={element.source.name} left={'50%'} />
                    </div>);
                })
              }
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="my-5 d-flex justify-content-between">
          <button className={`btn btn-primary text-light ${this.state.page <= 1 ? "disabled" : ""} position-sticky`}
            onClick={this.prevPage}><b>&lArr; Previous</b></button>
          <button className={`btn btn-light text-primary border border-primary ${this.state.page >= 4 ? "disabled" : ""}`}
            onClick={this.nextPage}  ><b>Next &rArr;</b></button>
        </div> */}
      </>
    )
  }
}

export default News;