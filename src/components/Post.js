import React from 'react';
import { connect } from 'react-redux';

import { convertTimeStamp } from '../utilities/math' ;

/*
    Presentational Layer
*/

import { ConnectedCounter } from './post/Counter' ;
import { CommentBody } from './post/Body' ;
import { CommentTitle } from './post/Title' ;
import { CommentInfo } from './post/Info' ;
import { Button, ButtonSet } from './post/Button' ;

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


    /*
        post keeps internal state reference of
            Title content
            Body content
            edit state (edit mode / !edit mode)
    */

    /*
        controlled components
    */
    updateTitle = ({ target:{ value } }) => this.setState({ title:value } ) ;
    updateBody = ({ target:{ value } }) => this.setState({ body:value } ) ;
    // edit
    toggleEditMode= callback => this.setState( prev=>({ edit:!prev.edit }), callback ) ;

    /*
        methods:
            action
            cancel
            post
            delet
    */


    action= e => {
        e.preventDefault() ;
        const {user, author, deleted, reply} = this.props ;
        user===author?
            // if users comment, edit
            !deleted && this.toggleEditMode() :
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
                edit:!prev.edit, // toggleEditMode
                title, body
            }) )
    } ;



    post= e => {
        e.preventDefault() ;
        const   {title, body } = this.state ,
                { editnumber, update } = this.props ;

        // !title && 'red border' ;
        // !body && 'red border' ;
        // if (!title || !body) return ;

        this.toggleEditMode( _=>update(title, body, !editnumber) )
    } ;



    delete= e => {
        e.preventDefault() ;
        const { delete_ } = this.props;
        this.setState( { edit:false }, _=>delete_() ) ;
    }



    render() {
        const   {   user,
                    id, author, timestamp, deleted, voteScore, editnumber } = this.props ,
                { edit, title, body }  = this.state  ;

        return <section
                    className={`post ${author===user&&'author'} ${deleted&&'deleted'}`} >

                    <div className={'header'}>

                        <ConnectedCounter className={'counter'}
                            id={id}
                            voteScore={voteScore} />

                        <div className={'content'}>
                            <CommentTitle className={'title'}
                                {...{edit}}
                                handler={this.updateTitle}
                                content={ title} />

                            <CommentInfo className={'info'}
                                {...{ author, editnumber }}
                                {...convertTimeStamp( timestamp ) } /> {/* day , number , month , year*/}

                            <CommentBody className={'body'}
                                {...{edit}}
                                handler={this.updateBody}
                                content={ body} />
                        </div>

                    </div>

                    {(_=>{ const
                        _isUser= user===author,  _isDeletable= (_isUser && editnumber !== 0 && !deleted),
                        _editButtons=
                                            <ButtonSet>
                                                <Button onClick={this.post}> post </Button>
                                                <Button onClick={this.cancel}> cancel </Button>
                                            </ButtonSet> ,
                        _displayButtons=    <Button onClick={this.action}> { _isUser? 'edit' : 'reply' } </Button> ,
                        _deleteButtons=     <Button onClick={this.delete}> delete </Button> ;

                        return(
                            <ButtonSet>
                                { !deleted && (edit? _editButtons : _displayButtons) }
                                { _isDeletable && _deleteButtons }
                            </ButtonSet> )})()}
                </section>
        }   }

export default connect(
                    (state, {id}) => {
                        /*
                            by updating title, body ( passing as props on dispatch )
                        */
                        const {
                            title, body, timestamp,
                            deleted, editnumber } = state.posts[id] ;
                        return { title, body, timestamp, deleted, editnumber } }
                )(Post) ;