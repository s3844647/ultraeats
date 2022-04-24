import React, { useState, useEffect } from "react";
import userService from "../../actions/user-service";

const BoardModerator = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        userService.getModeratorBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = error.response.data.message;
                setContent(_content);
            }
        );
    }, []);
    return (
        <div className="container">
            {content}
        </div>
    );
};
export default BoardModerator;