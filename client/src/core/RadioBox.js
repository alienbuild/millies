import React, {useState, useEffect, Fragment} from 'react';

const RadioBox = ({ prices }) => {

    // Init state
    const [value, setValue] = useState(0);

    // Handle change
    const handleChange = () => {
      console.log('Handling change');
    };

    return prices.map((price, index) => (
        <li key={index} className="list-unstyled">
            <input type="radio" name={`price-${index}`} className="mr-2 ml-4" onChange={handleChange()} value={`${price._id}`} />
            <label htmlFor={`category-${index}`} className="form-check-label">{price.name}</label>
        </li>
    ))
};

export default RadioBox;