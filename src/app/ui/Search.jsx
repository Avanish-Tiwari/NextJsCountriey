import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
  return <div className="flex items-center gap-2 max-w-md">
    
    <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: "16px", height: "16px"}}/>

   
    <input type="text" placeholder="Search for a country..." className="outline-none text-sm" />
  </div>;
}


