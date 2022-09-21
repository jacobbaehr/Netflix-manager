import React from "react"
import { supabase } from "../client"

export default function Table() {

    const [show, setShow] = React.useState(false)
    const [movies, setMovies] = React.useState("")
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

    const handleAddFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute('name')
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
    }


    function handleShow() {
        setShow(prevShow => !prevShow)
        setBtnText(() => {
            return (
                show ? "Show My Movies and Shows" : "Hide My Movies and Shows"
            )
        })

    }

    React.useEffect(() => {
        const LoadShows = async () => {
            const { data, error } = await supabase
                .from('Netflix')
                .select()
            setMovies(data)
        }
        LoadShows()
    }, [])


    return (
        <div>
            <button onClick={handleShow}>{btnText}</button>
            {show && <div className="table-container">
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
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr>
                                <td>{movie.show_id}</td>
                                <td>{movie.type}</td>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.country}</td>
                                <td>{movie.date_added}</td>
                                <td>{movie.release_year}</td>
                                <td>{movie.rating}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.listed_in}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <h2>Add a Movie or Show</h2>
                <form>
                    <input type="text" onChange={handleAddFormChange} name="show_id" required="required" placeholder="Enter a show_id"></input>
                    <input type="text" onChange={handleAddFormChange} name="type" required="required" placeholder="Enter a type"></input>
                    <input type="text" onChange={handleAddFormChange} name="title" required="required" placeholder="Enter a title"></input>
                    <input type="text" onChange={handleAddFormChange} name="director" required="required" placeholder="Enter a director"></input>
                    <input type="text" onChange={handleAddFormChange} name="country" required="required" placeholder="Enter a country"></input>
                    <input type="text" onChange={handleAddFormChange} name="date_added" required="required" placeholder="Enter a date_added"></input>
                    <input type="text" onChange={handleAddFormChange} name="release_year" required="required" placeholder="Enter a release_year"></input>
                    <input type="text" onChange={handleAddFormChange} name="ra ting" required="required" placeholder="Enter a rating"></input>
                    <input type="text" onChange={handleAddFormChange} name="duration" required="required" placeholder="Enter a duration"></input>
                    <input type="text" onChange={handleAddFormChange} name="listed_in" required="required" placeholder="Enter a listed_in"></input>
                    <button type="submit">Add</button>
                </form>
            </div>}
        </div>
    )
}