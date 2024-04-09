import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface Blog{
    "id": string,
    "title": string;
    "content": string;
    "published": boolean;
    "authorId": string;
    "createdAt": string;
    "updatedAt": string;
    "author"?: {
        "id": string;
        "name": string;
        "email": string;
        "createdAt": string;
        "updatedAt": string;
    }

}
export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{ Authorization: localStorage.getItem('token')}
        }).then((response)=>{
            console.log(response);
            setBlogs(response.data.blogs);
            setloading(false);
        })

    }, []);

    return{
        loading,
        blogs
    }
}

export function useBlog({id}: {id: string}){
    
    const [loading, setloading] = useState(true);
    const [blog, setBlog] = useState<Blog>(defaultBlog);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{ Authorization: localStorage.getItem('token')}
        }).then((response)=>{
            console.log(response);
            setBlog(response.data.blog);
            setloading(false);
        })

    }, [id]);

    return{
        loading,
        blog
    }
}

const defaultBlog: Blog ={
        content: "Another random set of ewords which are also important in one's life. OS is an operating system which needs ro be speed up by some of the mosat amazing minds of the century also we now know how far we can push past our own capabilities.",
        title: "Test by user 2",
        id: "cluqvydux00049csxyuxubimg",
        createdAt: "2024-04-08T11:45:08.821Z",
        updatedAt: "2024-04-08T11:45:08.821Z",
        authorId: "cluqvs1lz00009csxpx43rbap",
        author: {
            "name": "username1",
            "id": "cluqvs1lz00009csxpx43rbap"
        }
}