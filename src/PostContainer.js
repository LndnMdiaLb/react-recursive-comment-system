import React from 'react';
import {connect} from 'react-redux';

// [mapStateToProps(state, [ownProps]): stateProps]               (Function)

/**
 *
 * If this argument is specified, the new component will subscribe to Redux store updates
 * This means that any time the store is updated, mapStateToProps will be called

---
*/
// [mapDispatchToProps(dispatch, [ownProps]): dispatchProps]      (Object or Function)

// [mergeProps(stateProps, dispatchProps, ownProps): props]       (Function)

// export default connect(state => state)(TodoApp)

const PostContainer = ({ parentfilteringlogic, parentaddChildContainer, parentsetState, children }) => {

      let _delete = _=>_;
      let addChildContainer = _=>_;
      let filteringlogic = _=>_;

      const childServices =_ => ({

      })

      return (
        <React.Fragment>
          <Post>

            <DeletableContent>

              <EditTitle></EditTitle>
              <Title></Title>

              <UserName></UserName>

              <EditStory></EditStory>
            <Story></Story>

            </DeletableContent>

          </Post>

          <Delete task = {'parent deletes THIS <PostContainer >'}>
            <svg></svg>
            <button></button>
          </Delete>
          <Add
            task= {
              addData => {
                return parentsetState (
                  'parent nests a <PostContainer> via children' ,
                  addData ,
                  { filtering } )
            }}>
            <svg></svg>
            <button></button>
          </Add>
          <Sort
            task = { filtering => parent.setState( {filtering} ) }
          ></Sort>

          { children && children }

        </React.Fragment>
  )
};


const mapStateToProps = (state, ownProps) => {
  return { todos: state.todos }
}

const PostContainer = connect(mapStateToProps)( PostContainer  ) ;

export default PostContainer ;