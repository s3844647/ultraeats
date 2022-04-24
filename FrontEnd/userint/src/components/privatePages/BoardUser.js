import React, { useState, useEffect } from "react";
import userService from "../../actions/user-service";

const BoardUser = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        userService.getUserBoard().then(
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
export default BoardUser;