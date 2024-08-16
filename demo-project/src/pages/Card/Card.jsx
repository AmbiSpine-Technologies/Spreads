import React, { useState } from "react";

const Card = ({ title, description, image }) => {
    const [ Expand, setExpand] = useState(false);
    const text = description;
    const previewtext = 50;

    return (
        <div className="card m-1" style={{ width: "222px" }}>
            <img src={image} alt={title} className="card-img-top" height="200" />
            <div className="card-body" style={{ fontSize: "1rem", textAlign: "left" }}>
                <p className="text-muted " style={{fontSize: ".8rem"}}>
                    {Expand ? text : text.substring(0, previewtext) }
                </p>
                <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); setExpand(!Expand)}}>
                    {Expand ? "See less" : "See More"}
                </a>
            </div>
        </div>
    );
}

export default Card;
