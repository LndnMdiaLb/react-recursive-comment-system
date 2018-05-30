import React from 'react';

export const CommentBody = ({className, edit, handler, content}) =>
    <div {...{className}}>
        { edit ?
            (   <textarea
                    placeholder= { 'Enter Story' }

                    onChange= { handler }
                    value= { content } /> ) :

            (   <p>{ content }</p> ) }
    </div> ;
