import React from 'react';
import Container from './Container' ;

import { Provider, Consumer } from './GlobalState' ;
import { getRemotePosts } from '../utilities/network' ;

/*
    Threads
    receives flat store? data
*/
export const Thread=({tree})=>{

    const state= {
            user:'Chris',
            tree:{} } ,

    generateNestedContainers = ({children:childrenObjects, ...props}) =>
        <Consumer key={props.id} >{
            state =>
                <Container { ...{ ...props, ...state } }>
                    {
                        /*
                            the children property refers to a property on the props object ( see: generateTree )
                            not react component props.children.  The results are nested components
                            (accesible in Container as regular children)
                        */
                        childrenObjects && childrenObjects.map( obj=> generateNestedContainers(obj) ) }
                </Container> }
            </Consumer>  ;

    return <Provider value={ { user:state.user } }>
                {
                    /*
                        loop through root parent objects of tree and create
                        nested Container Components to mirror tree.
                    */

                    Object.entries(tree).map(
                        ([key, obj]) => generateNestedContainers(obj) )
                        // .concat(
                        //     <button onClick={_=>getRemotePosts()}>check</button> )
                }

                { <button onClick={_=>getRemotePosts()}>check</button> }
            </Provider>   ;

}