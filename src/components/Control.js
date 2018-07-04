import React, { Component } from 'react';

export class Control extends Component {

    state={ control:'' }
    constructor(props){ super(props) ;
        this.state.control= this.props.control || '' ;
    }


    change= ({target:{value:control}}) => {
            const {date, vote, hidden}= this.props ;
                switch (control){
                    case 'date' : date() ; break ;
                    case 'vote' : vote() ; break ;
                    case 'hidden' : hidden() ; break ;
                    default : return date() ; }
                this.setState({control}) ; }

    render=_=>
            <div className='control'>
                <span>comments: </span>
                <select name="text"
                        value={this.state.control}
                        onChange={this.change}>
                            <option value='date'>by date</option>
                            <option value='vote'>by votes</option>
                            <option value='hidden'>hidden</option>
                </select>
            </div> ;
}