import React from 'react';
import { connect } from 'react-redux';

import { voteAction, deleteAction } from './Redux/actions' ;
import { convertTimeStamp } from './utilities/utilities' ;







class Counter extends React.Component {

    state= {} ;
    constructor( props ) { super(props) ;
        this.state.voteScore= this.props.voteScore ;
    } ;

    changeVoteScore= ( { target:{ value } } ) => {
        const {id, voteScore, dispatch }= this.props ;

        if(value<voteScore-1 || value>voteScore+1) return ;

        // because we want to limit upvotes to -1 / +1 per 'session' we handle votescore internally and don't register connect for updates
        this.setState( { voteScore:value } , _=> dispatch( voteAction(id, value) ))
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
    }
}

const ConnectedCounter = connect()(Counter) ;













const CommentTitle = ({className, edit, handler, content}) =>
    <div {...{className}}>
        { edit ?
            (   <input
                    type= { 'text' }
                    placeholder= { 'Enter Title' }

                    onChange= { handler }
                    value= { content } /> ) :

            (   <h1>{ content }</h1> ) }
    </div> ;











const CommentBody = ({className, edit, handler, content}) =>
    <div {...{className}}>
        { edit ?
            (   <textarea
                    placeholder= { 'Enter Story' }

                    onChange= { handler }
                    value= { content } /> ) :

            (   <p>{ content }</p> ) }
    </div> ;











const CommentInfo = ({author, day , number, month , year, editnumber }) =>
    <div className={'info'}>
        <span>{ editnumber>1?'edited':'post' } by: <b>{author}</b></span> <span><i>{day}, {number} {month}, {year}</i></span>
    </div> ;










const Button = ({onClick, children, ...props}) =>
    <button type='button' onClick={onClick} {...props}>{children}</button>

const ButtonSet = ({children}) => <React.Fragment>{children}</React.Fragment>










/*
    Presentational Layer
*/


class Post extends React.Component {

    state= {} ;
    constructor( props ) { super(props) ;
        // transfer key props that component can modify to state
        const { title, body, editnumber }= this.props;
        this.state= { title, body, edit:!editnumber } ;
    } ;





    updateTitle = ({ target:{ value } }) => this.setState({ title:value } ) ;
    updateBody = ({ target:{ value } }) => this.setState({ body:value } ) ;
    toggleEditMode= callback => this.setState( prev=>({ edit:!prev.edit }), callback ) ;






    action= e => {
        e.preventDefault() ;
        const {user, author ,reply} = this.props ;
        user===author?
            // if users comment, edit
            this.toggleEditMode() :
            // if others comment, call reply() on parent to add child comment
            reply()
    } ;

    cancel= e => {
        e.preventDefault() ;
        const {editnumber, cancel} = this.props ;
        editnumber===0?
            // if new post call cancel() on parent to remove
            cancel() :
            // if existing post, revert to  title & body from props
            this.setState( (prev, {title, body}) => ({
                edit:!prev.edit,
                title, body
            }) )
    } ;

    post= e => {
        e.preventDefault() ;
        const   {title, body } = this.state ,
                {update} = this.props ;

        // !title && 'red border' ;
        // !body && 'red border' ;
        // if (!title || !body) return ;

        this.toggleEditMode( _=> update(title, body) )
    } ;

    delete= e => {
        e.preventDefault() ;
        const {id, dispatch } = this.props;
        this.setState( { edit:false }, _=> dispatch(deleteAction(id)) ) ;
    }







    render() {
        const   { id, user , author , deleted, voteScore, editnumber, timestamp } = this.props ,
                { edit }  = this.state  ;

        return <section
                    className={`post ${author===user&&'author'} ${deleted&&'deleted'}`} >

                    <div className={'header'}>

                        <ConnectedCounter
                            className={'counter'}
                            id={id}
                            voteScore={voteScore} />

                        <div className={'content'}>
                            <CommentTitle className={'title'}
                                {...{edit}}
                                handler={this.updateTitle}
                                content={ this.state.title} />

                            <CommentInfo {...{ author, editnumber }} {...convertTimeStamp( timestamp ) }/> {/* day , number , month , year*/}

                            <CommentBody className={'body'}
                                {...{edit}}
                                handler={this.updateBody}
                                content={ this.state.body} />
                        </div>
                    </div>

                    {(_=>{ const
                        _isUser= user===author,  _isDeletable= (_isUser && editnumber !== 0),
                        _editButtons=
                                            <ButtonSet>
                                                <Button onClick={this.post}> post </Button>
                                                <Button onClick={this.cancel}> cancel </Button>
                                            </ButtonSet> ,
                        _displayButtons=    <Button onClick={this.action}> {_isUser? 'edit':'reply'} </Button> ,
                        _deleteButtons=     <Button onClick={this.delete}> delete </Button> ;

                        return(
                            <ButtonSet>
                                { edit? _editButtons : _displayButtons }
                                { _isDeletable && _deleteButtons }
                            </ButtonSet> )})()}
                </section>
        }   }

export default connect(
                    (state, {id}) => {
                        const { title, body, timestamp, deleted, editnumber } = state.posts[id] ;
                        return { title, body, timestamp, deleted, editnumber } }
                )(Post) ;