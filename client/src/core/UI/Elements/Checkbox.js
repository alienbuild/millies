import React, { useState, useEffect} from 'react';

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = category => () => {
        // Check if category already exists in state array
        const currentCategoryId = checked.indexOf(category);
        const newCheckedCategoryId = [...checked];
        if (currentCategoryId === - 1){
            // Category doesn't already exist in the state
            newCheckedCategoryId.push(category);
        } else {
            // Category does already exist
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((category, index) => (
      <li key={index} className="list-unstyled">
          <input type="checkbox" name={`category-${index}`} className="form-check-input" onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} />
          <label htmlFor={`category-${index}`} className="form-check-label">{category.name}</label>
      </li>
    ))
};

export default Checkbox;