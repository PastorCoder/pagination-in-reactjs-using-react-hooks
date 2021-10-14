import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
    const data = res.data;
    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((pd) => (
      <div key={pd.id}>
        <p>{pd.title}</p>
        <img src={pd.thumbnailUrl} alt="" />
      </div>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };

  useEffect(() => {
    getData()
  }, [offset])



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

return (
 <>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5"></div>
      <div className="col-md-3">
      <div className="App"><br />
      <h5>Images from <code>jsonplaceholder</code></h5><br /><br />
    {data}<br /><br />
     <ReactPaginate
                  previousLabel={"back"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
  </div>
  <div className="col-md-4"></div>
      </div>
    </div>
  </div>
 </>
);
}

export default App;
