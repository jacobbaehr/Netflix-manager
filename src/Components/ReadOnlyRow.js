import React from "react"

const ReadOnlyRow = ({ show, handleEditClick, handleDeleteClick }) => {
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
                <button className="edtBtn" type="button" onClick={(event) => handleEditClick(event, show)}>Edit</button>
                <button className="dltBtn" type="button" onClick={(event) => handleDeleteClick(show.show_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow