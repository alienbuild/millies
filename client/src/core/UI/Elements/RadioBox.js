import React, {useState, useEffect, Fragment} from 'react';


const RadioBox = ({ prices, handleFilters }) => {

    // Init state
    const [value, setValue] = useState(0);

    // Handle change
    const handleChange = (event) => {
      handleFilters(event.target.value);
      setValue(event.target.value);
    };

    return prices.map((price, index) => (
        <li key={index} className="list-unstyled">
            <input type="radio" name={price} className="mr-2 ml-4" onChange={(e) => handleChange(e)} value={`${price._id}`} />
            <label htmlFor={`category-${index}`} className="form-check-label">{price.name}</label>
        </li>
    ))
};

export default RadioBox;