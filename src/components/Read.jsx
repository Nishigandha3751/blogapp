import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaCommentDots } from 'react-icons/fa';
import { BiSolidLike } from "react-icons/bi";

const Read = () => {
    const [blog, setBlog] = useState([]);
    const [comment, setComment] = useState('');
    const [readStates, setReadStates] = useState({}); // To manage "Read More/Less" state
    const navigate = useNavigate();

    // Fetch blog data from API
    const getData = async () => {
        try {
            const res = await axios.get('https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog');
            setBlog(res.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Toggle read state for a specific blog post
    const toggleRead = (id) => {
        setReadStates(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the read state
        }));
    };

    // Remove blog post
    const remove = async (id) => {
        try {
            await axios.delete(`https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog/${id}`);
            setBlog((prev) => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    // Navigate to update blog post
    const update = (id) => {
        navigate(`/edit/${id}`);
    };

    // Like handler
    const handleLike = async (id, likes) => {
        try {
            await axios.put(`https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog/${id}`, { likes: likes + 1 });
            setBlog(prev => prev.map(post => post.id === id ? { ...post, likes: likes + 1 } : post));
        } catch (error) {
            console.error("Failed to like post", error);
        }
    };

    // Comment handler
    const handleComment = async (blogId) => {
        if (!comment) return;

        try {
            const currentBlog = blog.find(b => b.id === blogId);
            const updatedComments = [...(currentBlog.comments || []), { text: comment }];

            await axios.put(`https://66fb96008583ac93b40c4db3.mockapi.io/yes/blog/${blogId}`, { comments: updatedComments });
            setComment('');
            setBlog(prev => prev.map(post => post.id === blogId ? { ...post, comments: updatedComments } : post));
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

    // Show loading state if data hasn't been fetched yet
    if (blog.length === 0) return <h1>Loading...</h1>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">All Posts 😍</h1>
            <section className="row">
                {blog.map(({ id, image, name, content, likes, comments }) => {
                    const isRead = readStates[id]; // Check if the post is expanded
                    const desc = isRead ? content : `${content.substring(0, 100)}...`; // Truncate if not expanded

                    return (
                        <div key={id} className="col-md-4 mb-4">
                            <div className="card custom-card bg-light text-dark border border-primary p-3">
                                <img src={image} alt={name} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                    <div className="info">
                                        {desc}
                                        <span 
                                            style={{ cursor: 'pointer', color: isRead ? 'blue' : 'green', marginLeft: '5px' }} 
                                            onClick={() => toggleRead(id)}>
                                            {isRead ? "Read Less" : "Read More"}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-outline-primary" onClick={() => update(id)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-outline-danger" onClick={() => remove(id)}>
                                            <FaTrash />
                                        </button>
                                        <button className="btn btn-outline-info" onClick={() => handleLike(id, likes)}>
                                            <BiSolidLike /> {likes}
                                        </button>
                                    </div>
                                    <div className="mt-3">
                                        <h6>Comments</h6>
                                        {comments?.map((c, index) => (
                                            <p key={index}>{c.text}</p>
                                        ))}
                                        <input
                                            type="text"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="form-control mt-2"
                                        />
                                        <button className="btn btn-outline-info mt-2" onClick={() => handleComment(id)}>
                                            <FaCommentDots /> Add Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Read;
