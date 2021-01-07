import React from "react";
import { useHistory } from "react-router-dom";

export default function Chip(props) {
    let history = useHistory();

    return (
        <span
            style={{
                border: `2px solid #5557db`,
                opacity: 1,
                color: "#5557db",
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 12,
                borderRadius: 25,
                margin: 4,
                cursor: "pointer",
            }}
            onClick={(e) => {
                history.push(`/tags/${props.content}`);
                if (props.chipClick !== undefined) props.chipClick(props.content);
            }}
        >
            {props.content}
        </span>
    );
}
