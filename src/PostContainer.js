import React from 'react';

const PostContainer = ({ parentfilteringlogic, parentaddChildContainer, parentsetState, children }) => {

      let _delete = _=>_;
      let addChildContainer = _=>_;
      let filteringlogic = _=>_;

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

export default PostContainer ;