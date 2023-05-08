import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table } from 'reactstrap';

function Posts({selectedUser}) {
    const [posts, setPosts] = useState([]);

    const getPostsData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => setPosts(res.data))
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        getPostsData();
    }, [])

    const filteredPosts = selectedUser
        ? posts.filter((post) => post.userId === selectedUser)
        : posts;

    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ttile</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts && filteredPosts.map(post => (
                        <tr key={post.id}>
                            <th>{post.id}</th>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Posts;