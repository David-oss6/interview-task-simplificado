import { useState, useEffect } from 'react'
import axios from 'axios';
import './Styles/App.css';
import trCss from './Styles/tr.css'

function App() {
  const [initialData, setInitialData] = useState()
  const [toPrint, setToPrint] = useState(null)
  const [requestStatus, setRequestStatus] = useState({
    LOADING: false,
    ERROR: false,
    SUCCESS: false
  }) 
  const [count, setCount] = useState(0)
  const [colored, setColored] = useState(true)
useEffect(() => {
  setRequestStatus({
    ...requestStatus,
    LOADING: true
  })
 const fetchData= async () =>{   
   try {
     const data = await axios('https://randomuser.me/api/?results=100')
     data && setRequestStatus({
    ...requestStatus,
    LOADING: false,
    SUCCESS: true
  })
     setInitialData(data.data.results) 
      
   } catch (error) {
     setRequestStatus({
    ...requestStatus,
    LOADING: false,
    ERROR: true
  })     
   }
 }
 fetchData()  
}, []); 

useEffect(()=>{
setToPrint(initialData)
},[initialData])

useEffect(()=>{
  setToPrint(toPrint)  
}, [colored])


const sortCountry = ()=>{  
  setCount(count+1)
 let c =[...toPrint]
 if (count%2!==0){
   c.sort((a,b)=>{     
    if(a.location.country < b.location.country) 
    return -1
    if(a.location.country > b.location.country) 
    return 1
    if(a.location.country === b.location.country) 
    return 0
  })
 } else {
    c.sort((a,b)=>{     
    if(a.location.country < b.location.country) 
    return 1
    if(a.location.country > b.location.country) 
    return -1
    if(a.location.country === b.location.country) 
    return 0
 }) 
} 
  setToPrint(c)
}
const removeUser =(user)=>{
  const r = toPrint.filter((u)=>(user.cell !== u.cell))
  setToPrint(r)
}

  return (
    <div >
      {       
        requestStatus.LOADING && <p>Loading...</p>
      }
      {
         requestStatus.ERROR && <p>Something went wrong</p>
      }
       {
         requestStatus.SUCCESS && <div>           
          <div className='cabecera'>
            <h1>Interview Task</h1>
            <div>
              <button onClick={()=>setColored(!colored)} >Sort by Colors</button>
            <button onClick={()=>sortCountry()} >Sort by Country</button>
            <button onClick={()=>setToPrint(initialData)} >Restore</button>
            </div>
          </div>
          <table className='container' >
            <thead>
              <tr>
              <td>foto</td>
            <td>name</td>
            <td>surname</td>
            <td>country</td>
            <td>delete</td>
            </tr>
            </thead>
            <tbody>
              {
                (toPrint&&colored) &&   toPrint.map((user)=>{                                   
                let color;   
                if(toPrint.indexOf(user) %2 === 0 ){color = "green"} else{color= "orange"}  
                console.log("colored true", colored, color)                              
                 return <tr className={color}  key={user.cell} >
             <td><img src={user.picture.thumbnail} alt={user.name.first}/></td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td><button onClick={()=>removeUser(user)} >delete</button></td>
                 </tr>
                 }) 
              }           
            {
            
               (toPrint&& !colored) && toPrint.map((user)=>{                
                    console.log("colored false", colored)                                          
                 return <tr className={"tableRow"}  key={user.cell} >
             <td><img src={user.picture.thumbnail} alt={user.name.first}/></td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td><button onClick={()=>removeUser(user)} >delete</button></td>
                 </tr>
                 } )  
                                          

            }
            </tbody>
          </table>
        </div>
       }      
      
    </div>
  );
}

export default App;
