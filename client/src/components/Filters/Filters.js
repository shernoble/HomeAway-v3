// PropertyTypeFilters.js
import React from 'react';

export function Filters({ handleFilter, handleHomepage }){
    return (
        <div className="container">
        <form onSubmit={handleFilter}>
            <h5>Property Type</h5>
            <label>
            <input type="radio" name="choice" value="All" defaultChecked />
            <span>All</span>
            </label>
            <label>
            <input type="radio" name="choice" value="Flat" />
            <span>Apartment</span>
            </label>
            <label>
            <input type="radio" name="choice" value="Villa" />
            <span>Villa</span>
            </label>
            <label>
            <input type="radio" name="choice" value="Private House" />
            <span>Private House</span>
            </label>
            <label>
            <input type="radio" name="choice" value="Farm House" />
            <span>Farm House</span>
            </label>
            <label>
            <input type="radio" name="choice" value="Cottage" />
            <span>Cottage</span>
            </label>
            <button className="btn btn-outline-dark fil_btn" type="submit">
            Apply Filters
            </button>
        </form>
        <button className="btn btn-outline-success" onClick={handleHomepage}>
            View All
        </button>
        </div>
    );
};

