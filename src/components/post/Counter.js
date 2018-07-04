import React from 'react';
import { connect } from 'react-redux';

import { voteRemotePostAction } from '../../redux/asyncActions' ;
import { voteAction } from '../../redux/actions' ;

/*
Connected to redux store
Intent via dispatch:
    voteAction

    id, value
*/


class Counter extends React.Component {

    state= {} ;
    constructor( props ) { super(props) ;
        const { voteScore }= this.props ;
        this.state={
            initVoteScore: voteScore!==undefined? voteScore : 1 ,
            voteScore: voteScore!==undefined? voteScore : 1
        };
    } ;

    changeVoteScore= ( { target:{ value } } ) => {
        const {id, dispatch }= this.props ,
              {initVoteScore }= this.state ;

        if(value<initVoteScore-1 || value>initVoteScore+1) return ;

        const type = value<initVoteScore? 'downVote' : 'upVote' ;

        /*
            because we want to limit upvotes
            to -1 / +1 per 'session' we handle votescore
            internally and don't register connect for updates
        */

        this.setState(
            { voteScore:value } ,
                _=> dispatch(voteRemotePostAction(id, type))
                        .then( _=> dispatch( voteAction(id, value) )) )
    } ;

    render(){
        const {className} = this.props ;
        return (
            <input
                {...{className}}

                type= { 'number' }
                placeholder= { 1 }

                onChange= { this.changeVoteScore }
                value= { this.state.voteScore } />
        );
    } ;
}

export const ConnectedCounter = connect()(Counter) ;