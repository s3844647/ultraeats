import React, { useState, useEffect } from 'react';
import AccessService from '../../actions/user-service';

const LandingPage = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        AccessService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = error.toString();
                setContent(_content);
            }
        );
    }, []);
    return (
        <div className="container">
            {content}
        </div>
    )
}

export default LandingPage;