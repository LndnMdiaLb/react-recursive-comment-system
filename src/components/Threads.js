import React from 'react';
import Container from './Container' ;

import { Provider, Consumer } from './GlobalState' ;
import { getRemoteCategories } from '../utilities/network' ;

import { Button } from './post/Button' ;

/*
    Threads
    receives flat store? data
*/

export class Thread extends React.Component{

    rootContainer= React.createRef();

    handleValue=e=>{
        e.preventDefault();
        this.rootContainer.current.getWrappedInstance().createPost();
    }

    render(){
        const {children:comments, ...props}= this.props ;
        return (
            <React.Fragment>
                <Button onClick={this.handleValue}> new post </Button>
                <Container ref={this.rootContainer}{ ...{ comments, ...props } } />
            </React.Fragment> )  ;
    }
}