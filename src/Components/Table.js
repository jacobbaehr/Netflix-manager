import React from "react"
import { supabase } from "../client"

export default function Table() {

    const [show, setShow] = React.useState(false)
    const [movies, setMovies] = React.useState("")
    const [btnText, setBtnText] = React.useState("Show My Movies and Shows")

    function handleShow() {
        setShow(prevShow => !prevShow)
        setBtnText(() => {
            return (
                show ? "Show My Movies and Shows" : "Hide My Movies and Shows"
            )
        })
        console.log(movies)

    }

    React.useEffect(() => {
        const LoadShows = async () => {
            const { shows } = await supabase
                .from('Netflix')
                .select()
                .limit(10)
            setMovies(shows)
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
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jenny Chan</td>
                            <td>3 waterfoot road</td>
                            <td>333-964-5968</td>
                            <td>jenny@gmail.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </div>
    )
}