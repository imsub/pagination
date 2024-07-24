import { useState,useEffect } from 'react'
import getData from "./Api/api";
import './App.css'

function App() {
  const [data, setData] = useState({data:[],pageData:[]});
  const [pgNo,setPgNo] = useState(1);
  useEffect(()=>{
    async function fetchData (){
      try{
        const result = await getData();
        console.log(result.length,result);
        localStorage.setItem('page',JSON.stringify(result));
        setData({
          pageData:result.splice(0,10)
        })
      }
      catch(error){
        alert('failed to fetch data');
      }
    }
    fetchData();
  },[]);
  const handler = (event)=>{
    console.log(event.target.innerText);
    const btn = event.target.innerText;
    const data = JSON.parse(localStorage.getItem('page'));
    if((pgNo === 1 && btn === 'Previous') || (pgNo === Math.ceil(data.length/10) && btn === 'Next')){
      event.preventDefault();
    }
    else if(btn === 'Next'){
        const newPgNo = pgNo+1;
        setData({
          pageData: data.slice((newPgNo*10)-10,newPgNo*10)
        });
        setPgNo(newPgNo);
    }
    else{
      const newPgNo = pgNo-1;
      setData({
        pageData: data.slice((newPgNo*10)-10,newPgNo*10)
      });
      setPgNo(newPgNo);
    }

  }
  return (
    <div>
      <h1>Employee Data Table</h1>
      <table id="myTable" style={{margin:'2rem',width:'90%'}}> 
      <thead style={{background:'#2c9b7f', color:'white',textAlign:'left'}}>
        <tr> 
            <th>ID</th> 
            <th>Name</th> 
            <th>Email</th> 
            <th>Role</th> 
        </tr>
        </thead>
        <tbody>
          {data.pageData.length ? data.pageData.map( (val,i) => 
          {
           return( (i == data.pageData.length - 1 )
            ?
            ( <tr key={val.id} >
              <td style={{borderBottom:'5px solid #2c9b7f'}}>{val.id}</td>
              <td style={{borderBottom:'5px solid #2c9b7f'}}>{val.name}</td>
              <td style={{borderBottom:'5px solid #2c9b7f'}}>{val.email}</td>
              <td style={{borderBottom:'5px solid #2c9b7f'}}>{val.role}</td>
            </tr> ) :
             (
              <tr key={val.id} >
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.role}</td>
            </tr>
            ) )    
          })
          : 
          <tr><td colSpan="4"><i>Loading...</i></td></tr>
          }
        </tbody>
    </table>
    <div style={{display:'flex',gap:'10px',justifyContent:'center',alignItems:'center'}}>
      <button onClick={handler}>Previous</button>{pgNo}
      <button onClick={handler}>Next</button>
      </div> 
    </div>
  )
}

export default App
