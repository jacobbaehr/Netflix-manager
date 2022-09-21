import React from "react"

const ReadOnlyRow = ({ show, handleEditClick }) => {
    return (
        <tr>
            <td>{show.show_id}</td>
            <td>{show.type}</td>
            <td>{show.title}</td>
            <td>{show.director}</td>
            <td>{show.country}</td>
            <td>{show.date_added}</td>
            <td>{show.release_year}</td>
            <td>{show.rating}</td>
            <td>{show.duration}</td>
            <td>{show.listed_in}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, show)}>Edit</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow