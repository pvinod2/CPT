import { Button } from "react-bootstrap";

const FilterComponent = (props :any) => (
    <>
        <div className="search-filter">
            <input type="text" className="search-btn" placeholder="Search"  value={props.filterText} onChange={props.onFilter} />               
            
        </div>   
        <button type="button" className="btn btn-primary" onClick={props.onClear}>
                  X
                </button>   
                                            
      
    </>
  );
  
  export default FilterComponent;
  