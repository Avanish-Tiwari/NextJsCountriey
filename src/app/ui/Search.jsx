import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function Search({handleSearch,searchTerm}) {
  const [query,setQuery]=useState(searchTerm || "");
  useEffect(()=>{
    const timeoutId=setTimeout(()=>{
      handleSearch(query.trim());
    },300);
    return ()=>clearTimeout(timeoutId);
  },[query,handleSearch])
  return <div className="flex items-center gap-2 max-w-md">
    
    <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: "16px", height: "16px"}}/>

   
    <input onChange={(e)=>setQuery(e.target.value)} value={query} type="text" placeholder="Search for a country..." className="outline-none text-sm" />
  </div>;
}


