import React from "react"
import { supabase } from "../client"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"

export default function Table() {

    const [visible, setVisible] = React.useState(false)
    const [shows, setShows] = React.useState("")
    const [btnText, setBtnText] = React.useState("Show My Movies and Shows")
    const [editShowId, setEditShowId] = React.useState(null)
    const [addFormData, setAddFormData] = React.useState({
        show_id: '',
        type: '',
        title: '',
        director: '',
        country: '',
        date_added: '',
        release_year: '',
        rating: '',
        duration: '',
        listed_in: ''
    })
    const [editFormData, setEditFormData] = React.useState({
        show_id: '',
        type: '',
        title: '',
        director: '',
        country: '',
        date_added: '',
        release_year: '',
        rating: '',
        duration: '',
        listed_in: ''
    })


    const handleAddFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        const newFormData = {...editFormData}
        newFormData[fieldName] = fieldValue
        
        setEditFormData(newFormData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault()

        const newShow = {
            show_id: addFormData.show_id,
            type: addFormData.type,
            title: addFormData.title,
            director: addFormData.director,
            country: addFormData.country,
            date_added: addFormData.date_added,
            release_year: addFormData.release_year,
            rating: addFormData.rating,
            duration: addFormData.duration,
            listed_in: addFormData.listed_in
        }

        const newShows = [...shows, newShow]
        console.log(shows)
        console.log(newShows)
        setShows(newShows)

        // update database
        addShowToSupabase(newShow)

    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()

        const editedShow = {
            show_id: editFormData.show_id,
            type: editFormData.type,
            title: editFormData.title,
            director: editFormData.director,
            country: editFormData.country,
            date_added: editFormData.date_added,
            release_year: editFormData.release_year,
            rating: editFormData.rating,
            duration: editFormData.duration,
            listed_in: editFormData.listed_in
        }

        const newShows = [...shows]

        const index = shows.findIndex((show) => show.show_id === editShowId)

        newShows[index] = editedShow
        setShows(newShows)

        //update database
        updateShowOnSupabase(editedShow)

        setEditShowId(null)
    }

    const handleEditClick = (event, show) => {
        event.preventDefault()
        setEditShowId(show.show_id)

        const formValues = {
            show_id: show.show_id,
            type: show.type,
            title: show.title,
            director: show.director,
            country: show.country,
            date_added: show.date_added,
            release_year: show.release_year,
            rating: show.rating,
            duration: show.duration,
            listed_in: show.listed_in
        }

        setEditFormData(formValues)
    }


    function handleVisible() {
        setVisible(prevVisible => !prevVisible)
        setBtnText(() => {
            return (
                visible ? "Show My Movies and Shows" : "Hide My Movies and Shows"
            )
        })

    }

    async function LoadShowsFromSupabase() {
        const { data } = await supabase
            .from("Netflix")
            .select()
            .limit(5)
        setShows(data)
    }

    async function addShowToSupabase(show) {
        console.log(show)
        await supabase
            .from("Netflix")
            .insert([show])

    }

    async function updateShowOnSupabase(show) {
        console.log(show)
        await supabase
            .from("Netflix")
            .update(show)
            .match({show_id: show.show_id})
    }

    async function deleteShowOnSupabase(show) {
        console.log(show)
        await supabase
            .from("Netflix")
            .delete()
            .match({show_id: show.show_id})
    }

    React.useEffect(() => {
        LoadShowsFromSupabase()
    }, [])

    const handleCancelClick = () => {
        setEditShowId(null)
    }

    const handleDeleteClick = (show_id) => {
        const newShows = [...shows]
        const index = shows.findIndex(show => show.show_id === show_id)

        // update database
        deleteShowOnSupabase(newShows[index])

        newShows.splice(index, 1)
        setShows(newShows)
    }

    return (
        <div>
            <h1 className="slogan">Manage your Netflix shows right here!</h1>
            <button className="showTableBtn" onClick={handleVisible}>{btnText}</button>
            {visible && <div className="table-container">
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>show id</th>
                                <th>type</th>
                                <th>title</th>
                                <th>director</th>
                                <th>country</th>
                                <th>date added</th>
                                <th>release year</th>
                                <th>rating</th>
                                <th>duration</th>
                                <th>listed in</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shows.map((show) => (
                                <>
                                    {editShowId === show.show_id ? 
                                    (<EditableRow 
                                    editFormData={editFormData} 
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}
                                    />) : 
                                    (<ReadOnlyRow 
                                    show={show} 
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick }
                                    />)}
                                </>
                            ))}
                            
                        </tbody>
                    </table>
                </form>
                <h3>Add a Movie or Show</h3>
                <form className="newRecord"onSubmit={handleAddFormSubmit }>
                    <input size={"Enter a show id".length} type="text" onChange={handleAddFormChange} name="show_id" required="required" placeholder="Enter a show id"></input>
                    <input size={"Enter a type".length} type="text" onChange={handleAddFormChange} name="type" required="required" placeholder="Enter a type"></input>
                    <input size={"Enter a title".length} type="text" onChange={handleAddFormChange} name="title" required="required" placeholder="Enter a title"></input>
                    <input size={"Enter a director".length} type="text" onChange={handleAddFormChange} name="director" required="required" placeholder="Enter a director"></input>
                    <input size={"Enter a country".length} type="text" onChange={handleAddFormChange} name="country" required="required" placeholder="Enter a country"></input>
                    <input size={"Enter a date added".length} type="text" onChange={handleAddFormChange} name="date_added" required="required" placeholder="Enter a date added"></input>
                    <input size={"Enter a release year".length} type="text" onChange={handleAddFormChange} name="release_year" required="required" placeholder="Enter a release year"></input>
                    <input size={"Enter a rating".length} type="text" onChange={handleAddFormChange} name="rating" required="required" placeholder="Enter a rating"></input>
                    <input size={"Enter a duration".length} type="text" onChange={handleAddFormChange} name="duration" required="required" placeholder="Enter a duration"></input>
                    <input size={"Enter a listed in".length} type="text" onChange={handleAddFormChange} name="listed_in" required="required" placeholder="Enter a listed in"></input>
                    <button className="addBtn" type="submit">Add</button>
                </form>
            </div>}
        </div>
    )
}