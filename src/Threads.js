import React from 'react';
import { generateTree } from './utilities/utilities' ;
import Container from './Container' ;

import { statetree } from './Redux/statetree';

import { getCategories } from './utilities/stateFromApi' ;

/*
    Threads
    receives flat store? data
*/

class Threads extends React.Component {

    state= { user:'Chris' }

    constructor(props){
      super(props);
      getCategories()
        .then( res=>console.log(res) )
    }

    getPosts =() => statetree.posts ;

    /*
     Create Nested Container Components recursively using
     the tree object derived from extract() passing in the flat data object
    */

    nestContainers = ({children, ...props}) => (
            <Container
                key={props.id}
                { ...props }
                { ...{ user: this.state.user }} >
                {
                  /*
                    the children property refers to a property on the props object ( see: generateTree )
                    not react component props.children.  The results are nested components
                    (accesible in Container as regular children)
                  */
                  children && children.map(
                    childData => this.nestContainers(childData) ) }
            </Container> )

    render () {
      const posts = this.getPosts(),
            tree = generateTree(posts) ;
      return (
          <React.Fragment>
            {   /*  loop through root parent objects of tree and create
                    nested Container Components to mirror tree. */
                Object.entries(tree)
                        .map( ([key, obj]) => this.nestContainers(obj) ) }
          </React.Fragment>  )   }

}

export default Threads;