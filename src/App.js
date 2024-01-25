
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Card = (props) => {
  const imageSrc = props.data.image
  const name = props.data.name
  return (
    <div className='card'>
      <img src={imageSrc} alt={name} />
      <h3>{name}</h3>
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([])
  const [maxPageNumber, setMaxPageNumber] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [filterText, setFilterText] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const apiUrl = () => {
    let url = 'https://rickandmortyapi.com/api/character';

    if (pageNumber > 1 && pageNumber <= 42) {
      url += `?page=${pageNumber}`;
    }

    if (filterText) {
      url += `${pageNumber > 1 ? '&' : '?'}name=${filterText}`;
    }

    return url;
  };

  useEffect(() => {
    setLoading(true)
    axios.get(apiUrl())
      .then(res => {
        setData(res.data.results)
        setMaxPageNumber(res.data.info.pages)
        setLoading(false)

      })
      .catch(err => {
        setErrorMsg(err.response.data.error)
        setLoading(false)

      })
  }, [pageNumber, filterText])

  let handleChange = (el) => {
    setErrorMsg('')
    setPageNumber(1)
    setFilterText(el.target.value)
      }

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <input placeholder='Enter name' value={filterText} onChange={el => handleChange(el)} />
          {filterText ? <button className="buttonStyle" onClick={() => {
            setErrorMsg('')
            setFilterText('')
            setPageNumber(1)

          }}>Clear</button> : null}
        </div>
        <div className="pagination">
          <button className="buttonStyle" onClick={() => { if (pageNumber > 1) { setPageNumber(pageNumber - 1) } }}>
            Prev
          </button>
          <h2>{pageNumber} of {maxPageNumber}</h2>
          <button className="buttonStyle" onClick={() => { if (pageNumber < maxPageNumber) { setPageNumber(pageNumber + 1) } }}>
            Next
          </button>
        </div>
      </div>
          {
            loading? <h3>Loading...</h3>:errorMsg ? <h2 className='errorMsg'>{errorMsg}</h2> :
            <div className='content'>
              {data.map(el => <Card key={el.id} data={el} />)}
            </div>
          }
     

      <div className="pagination">
        <button className="buttonStyle2" onClick={() => { if (pageNumber > 1) { setPageNumber(pageNumber - 1) } }}>
          Prev
        </button>
        <button className="buttonStyle2" onClick={() => { if (pageNumber < maxPageNumber) { setPageNumber(pageNumber + 1) } }}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App;
