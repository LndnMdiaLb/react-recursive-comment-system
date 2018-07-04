import React from 'react';
import Container from './Container' ;

import { extract } from '../utilities/utilities' ;

/*
    the children property refers to a property on the props object ( see: extract )
    not react component props.children.  The results are nested components
    (accesible in Container as regular children)
*/

const composer= Component=> {
    const nest= ({children, ...props})=>
            <Component {...{ key:props.id, ...props }}>
                {   children && children.map( props=> nest(props) ) }
            </Component> ;
    return nest ;
    } ;

/*
    Threads

    Receives flat store? data
*/

export class Thread extends React.Component{

    constructor(props){ super(props) ;

        const nested= extract(props.posts) ;

        this.ui_object_tree =  {
            editnumber:1 ,
            root:true,
            children:  Object.entries(nested)
                            .map(([, comment])=>comment)
        }   ;
    }

    /*

    */

    render=_=>(
        <div className='wrapper'>
            { composer(Container)(this.ui_object_tree) }
        </div>
    ) ;
}