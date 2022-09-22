import React from "react"

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    size={editFormData.show_id.length} 
                    type="text" 
                    required="required" 
                    placeholder="Enter a show_id" 
                    name="show_id" 
                    onChange={handleEditFormChange} 
                    value={editFormData.show_id}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.type.length}  
                    type="text" 
                    required="required" 
                    placeholder="Enter a type" 
                    name="type" 
                    onChange={handleEditFormChange}
                    value={editFormData.type}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.title.length}  
                    type="text" 
                    required="required" 
                    placeholder="Enter a title" 
                    name="title" 
                    onChange={handleEditFormChange}
                    value={editFormData.title}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.director.length}  
                    type="text" 
                    required="required" 
                    placeholder="Enter a director" 
                    name="director" 
                    onChange={handleEditFormChange}
                    value={editFormData.director}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.country.length}  
                    type="text" 
                    required="required" 
                    placeholder="Enter a country" 
                    name="country" 
                    onChange={handleEditFormChange}
                    value={editFormData.country}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.date_added.length}  
                    type="text" 
                    required="required" 
                    placeholder="Enter a date added" 
                    name="date_added" 
                    onChange={handleEditFormChange}
                    value={editFormData.date_added}
                ></input>
            </td>
            <td>
                <input
                    size={JSON.stringify(editFormData.release_year).length} 
                    type="text" 
                    required="required" 
                    placeholder="Enter a release year" 
                    name="release_year" 
                    onChange={handleEditFormChange}
                    value={editFormData.release_year}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.rating.length} 
                    type="text" 
                    required="required" 
                    placeholder="Enter a rating" 
                    name="rating" 
                    onChange={handleEditFormChange}
                    value={editFormData.rating}
                ></input>
            </td>
            <td>
                <input 
                    size={editFormData.duration.length} 
                    type="text" 
                    required="required" 
                    placeholder="Enter a duration" 
                    name="duration" 
                    onChange={handleEditFormChange}
                    value={editFormData.duration}
                ></input>
            </td>
            <td>
                <input
                    size={editFormData.listed_in.length} 
                    type="text" 
                    required="required" 
                    placeholder="Enter a listed in" 
                    name="listed_in" 
                    onChange={handleEditFormChange}
                    value={editFormData.listed_in}
                ></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRow