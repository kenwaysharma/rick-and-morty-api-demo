/* eslint-disable */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Card = (props)=>{
  console.log("dataaaaaaaaaaa",props)
  const imageSrc = props.data.image
  const name = props.data.name
  return(
    <div style={{backgroundColor:'blueviolet', width:'20%', display:'flex', flexDirection:'column', justifyContent:'center'}}> 
      <img src={imageSrc}  />
      <h3 style={{fontSize:'16px'}}>{name}</h3>
    </div>
  )
}
const buttonStyle = {
  fontSize: '16px',
  padding: '10px 16px',
  margin: '15px',
  
  /* GENERIC SETTING */
  background: 'none',
  cursor: 'pointer',
  borderRadius: '3px',
  display: 'inline-block',
  color:'white',
  border: '1px solid white',
  transition: 'all .25s',
};
const buttonStyle2 = {
  fontSize: '16px',
  padding: '10px 16px',
  margin: '15px',
  
  /* GENERIC SETTING */
  background: 'none',
  cursor: 'pointer',
  borderRadius: '3px',
  display: 'inline-block',
  color:'black',
  border: '1px solid black',
  transition: 'all .25s',
};
const inputStyle={  width: '50%',
height: '56px',
borderRadius: '4px',
position: 'relative',
backgroundColor: 'rgba(255,255,255,0.3)',
fontSize:'20px',
color:'white'
}
const App = ()=>{
  const [data, setData] = useState([])
  const [maxPageNumber, setMaxPageNumber] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [filterText, setFilterText] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  

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
  

  useEffect(()=>{
    axios.get(apiUrl())
      .then(res=>{
        console.log(res)
        setData(res.data.results)
        setMaxPageNumber(res.data.info.pages)
      })
      .catch(err=>{
        setErrorMsg(err.response.data.error)
        })
  },[pageNumber, filterText])
 
  let handleChange=(el)=>{
    setPageNumber(1)
    setFilterText(el.target.value)
    setErrorMsg('')
    console.log(el.target.value)
  }
  return(
    <div className="App" style={{width:'100%', display:'flex', flexDirection:'column',alignItems:'center'}}> 
      
        <div className="App-header" style={{width:'100%', display:'flex', flexDirection:'column'}} >
          
          <div>
          <input style={inputStyle} placeholder='Enter name' value={filterText} onChange={el=>handleChange(el)}  />
  
          {filterText?<button style={buttonStyle} onClick={()=>{
            setFilterText('')
            setErrorMsg('')
            }}>Clear</button>:null}
            

          </div>
          <div style={{display:'flex', gap: '10px', margin:'15px', width:'100%', justifyContent:'center'}}>
              <button style={buttonStyle} onClick={()=>{if(pageNumber>1){setPageNumber(pageNumber-1)}}}>
                  Prev
                </button>
                <h2>{pageNumber} of {maxPageNumber}</h2>
                <button style={buttonStyle}  onClick={()=>{if(pageNumber<maxPageNumber){setPageNumber(pageNumber+1)}}}>
                  Next
                </button>
                
          </div>
          
        </div>
        
            {errorMsg?<h1>{errorMsg}</h1>:
            <div style={{gap:'20px',display:'flex', flexDirection:'row',flexWrap:'wrap', margin:'25px 50px 25px 50px', justifyContent:'center' }}>
              {data.map(el=><Card data={el}/>)}
              </div>
            }
       
        <div style={{display:'flex', gap: '10px', margin:'15px'}}>
        <button style={buttonStyle2} onClick={()=>{if(pageNumber>1){setPageNumber(pageNumber-1)}}}>
                  Prev
                </button>
                <button style={buttonStyle2}  onClick={()=>{if(pageNumber<maxPageNumber){setPageNumber(pageNumber+1)}}}>
                  Next
                </button>
                
        </div>
        
      </div>
  )
}

export default App;
