import './Create.css'; // Import the new custom CSS
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const navigation = useNavigate();

    const sendData = (e) => {
        e.preventDefault();
        axios.post('https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog', { image, name, content, likes: 0 })
            .then(() => {
                setImage("");
                setName("");
                setContent("");
                navigation('/read');
            })
            .catch((error) => {
                console.error("There was an error creating the blog post!", error);
            });
    }

    return (
        <div className="container create-container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h2>Create a New Blog Post</h2>
                            <form onSubmit={sendData}>
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
                                        id="info"
                                        placeholder="Enter content..."
                                        onChange={(e) => setContent(e.target.value)}
                                        value={content}
                                        rows="4"
                                    />
                                </div>
                                <button type="submit" className="btn btn-custom">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
