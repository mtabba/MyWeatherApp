import { useState } from "react";


function SearchBar() {

    const [location, setLocation] = useState("Lahore");

    const handleSubmit = () => {

    }
    return (
        <>
            <div className="input-group mb-3 col-lg-6">
                <button className="fa fa-search input-group-text" onClick={handleSubmit}></button>
                <input type="text" className="form-control" placeholder="Enter City Name" aria-label="City name" aria-describedby="basic-addon1"/>
            </div>

        </>
    )
}


export default SearchBar;