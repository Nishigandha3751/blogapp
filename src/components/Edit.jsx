import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Edit = () => {

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const { id } = useParams()

    console.log(id)

    const getData = async () => {
        const res = await axios.get(`https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog/${id}`)
        setImage(res.data.image)
        setName(res.data.name)
        setContent(res.data.content)
    }

    const navigation = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    const updated = async (e) => {
        e.preventDefault()
        await axios.put(`https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog/${id}`, { image, name, content })
        navigation('/read')
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Edit Blog Post</h2>
                            <form onSubmit={updated}>
                                <div className="form-group mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="Enter image URL..."
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your Name..."
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        placeholder="Enter content..."
                                        onChange={(e) => setContent(e.target.value)}
                                        value={content}
                                        rows="4"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
