import React from 'react';

export const CommentInfo = ({className, author, day , number, month , year, editnumber }) =>
    <div {...{className}}>
        <span>{ editnumber>1?'edited':'post' } by: <b>{author}</b></span> <span><i>{day}, {number} {month}, {year}</i></span>
    </div> ;
