import React from "react"
import { supabase } from "../client"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"

export default function Table() {

    const [visible, setVisible] = React.useState(false)
    const [shows, setShows] = React.useState("")
    const [btnText, setBtnText] = React.useState("Show My Movies and Shows")
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
    const [editShowId, setEditShowId] = React.useState(null)

    const handleAddFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute('n ame')
        const fieldValue = event.target.value

        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
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
        setShows(newShows)

        // update database
        addShowToSupabase(newShow)

    }

    const handleEditClick = (event, show) => {
        event.preventDefault()
        console.log(event)
        console.log(show)
        setEditShowId(show.show_id)
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
            .limit(10)
        setShows(data)
    }

    async function addShowToSupabase(show) {
        console.log(show)
        await supabase
            .from("Netflix")
            .insert([show])

    }

    React.useEffect(() => {
        LoadShowsFromSupabase()
    }, [])


    return (
        <div>
            <button onClick={handleVisible}>{btnText}</button>
            {visible && <div className="table-container">
                <form>
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
                                    {editShowId === show.show_id ? <EditableRow/> : <ReadOnlyRow show={show} handleEditClick={handleEditClick}/>}
                                </>
                            ))}
                            
                        </tbody>
                    </table>
                </form>
                <h2>Add a Movie or Show</h2>
                <form onSubmit={handleAddFormSubmit }>
                    <input type="text" onChange={handleAddFormChange} name="show_id" required="required" placeholder="Enter a show id"></input>
                    <input type="text" onChange={handleAddFormChange} name="type" required="required" placeholder="Enter a type"></input>
                    <input type="text" onChange={handleAddFormChange} name="title" required="required" placeholder="Enter a title"></input>
                    <input type="text" onChange={handleAddFormChange} name="director" required="required" placeholder="Enter a director"></input>
                    <input type="text" onChange={handleAddFormChange} name="country" required="required" placeholder="Enter a country"></input>
                    <input type="text" onChange={handleAddFormChange} name="date_added" required="required" placeholder="Enter a date added"></input>
                    <input type="text" onChange={handleAddFormChange} name="release_year" required="required" placeholder="Enter a release year"></input>
                    <input type="text" onChange={handleAddFormChange} name="rating" required="required" placeholder="Enter a rating"></input>
                    <input type="text" onChange={handleAddFormChange} name="duration" required="required" placeholder="Enter a duration"></input>
                    <input type="text" onChange={handleAddFormChange} name="listed_in" required="required" placeholder="Enter a listed in"></input>
                    <button type="submit">Add</button>
                </form>
            </div>}
        </div>
    )
}