import React from "react";

export function Payment({num_days,listing}){
    return(
        <>
            <h5>Payment Summary</h5>
            <table className="table1 table table-bordered">
            <thead className="thead-dark">
                <tr>
                <th scope="col" className="heading1">
                    Details
                </th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>number of nights</td>
                <td>{num_days}</td>
                </tr>
                <tr>
                <td>cost per night</td>
                <td>{listing.CostPerN}</td>
                </tr>
                <tr>
                <td>taxes</td>
                <td>5%</td>
                </tr>
                <tr>
                <td>total cost (rupees) </td>
                <td>{num_days * listing.CostPerN + (num_days * listing.CostPerN * 0.05)}</td>
                </tr>
            </tbody>
            </table>
        </>
    )
}