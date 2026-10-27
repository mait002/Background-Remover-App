import React from "react";

export default function ResultFile(props){
    return (
        <>
        <div className="result">
            <img src={props.imageURL} id="resultImage"/>
            <a href={props.imageURL} id="downloadLink" download>Download Image</a>

        </div>
        </>

    )

}