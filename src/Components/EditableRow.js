import React from "react"

const EditableRow = () => {
    return (
        <tr>
            <td>
                <input type="text" required="required" placeholder="Enter a show_id" name="show_id "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a type" name="type "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a title" name="title "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a director" name="director "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a country" name="country "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a date added" name="date_added "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a release year" name="release_year "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a rating" name="rating "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a duration" name="duration "></input>
            </td>
            <td>
                <input type="text" required="required" placeholder="Enter a listed in" name="listed_in "></input>
            </td>
        </tr>
    )
}

export default EditableRow