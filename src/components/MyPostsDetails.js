import React from 'react';
import {useParams} from 'react-router-dom'


const MyPostsDetails = () => {
    const { postId } = useParams();

    console.log(postId)
}

export default MyPostsDetails;