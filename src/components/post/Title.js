import React from 'react';

export const CommentTitle = ({className, edit, handler, content}) =>
    <div {...{className}}>
        { edit ?
            (   <input
                    type= { 'text' }
                    placeholder= { 'Enter Title' }

                    onChange= { handler }
                    value= { content } /> ) :

            (   <h1>{ content }</h1> ) }
    </div> ;
