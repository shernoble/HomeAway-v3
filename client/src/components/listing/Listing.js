import React from "react";

const PropertyListing = ({ allListings }) => {
    return (
        <section className="houses" id="main">
        {allListings.map((element) => (
            <a key={element._id} href={`/guest/reserve/${element._id}`}>
            <div className="house">
                <div style={{ backgroundImage: `url(${element.img_url1})` }} className="house-img"></div>
                <p className="title">{element.Title.substring(0, 30) + "..."}</p>
                <p className="description">{element.Bedrooms} Bedroom(s), {element.Bathrooms} Bathroom(s)</p>
                <p className="location">{element.Address.District}, {element.Address.State}</p>
                <p className="pricep">Cost/Night: Rs.{element.CostPerN}</p>
            </div>
            </a>
        ))}
        </section>
    );
};

export default PropertyListing;
