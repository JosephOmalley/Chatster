import React from 'react'

export default function Message( {message, name}) {
    return (
        <div>
            <h1> {message}  {name} </h1> 
        </div>

    );
}