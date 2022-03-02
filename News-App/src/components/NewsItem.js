import { React, useState } from 'react';


function NewsItem(props) {
  const [date] = useState(new Date(props.dated).toUTCString());


  return (
    <>
      <div className="container card my-3 p-0" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1 }, { left: props.left }}>
          {props.source}
        </span>
        <img className="card-img-top" alt={props.alt} src={props.imageUrl ? props.imageUrl : "https://img.search.brave.com/wqQGaybABQLgU4FqBc3BgzoBHXA5H2pfzAiTtwbOBTE/rs:fit:640:480:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/Mi8xNS8wOS8zMy9u/ZXdzLTYzNjk3OF82/NDAuanBn"} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text"><small className="text-muted">By <b><u></u>{props.author ? props.author : props.source}</b><br />Dated: {date}</small></p>
          <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more...</a>
        </div>
      </div>
    </>
  )
}
export default NewsItem;