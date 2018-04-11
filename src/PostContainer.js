import React from 'react';
import {connect} from 'react-redux';
import {} from './Redux/actions';




const Post = ({ mode, username }) => {
  return (
    <React.Fragment>
      <DeletableContent>
        {
          mode === 'edit' ?
          (
            <EditTitle>
              <textarea></textarea>
              <form></form>
            </EditTitle>
          ) :
          (
            <Title>
              <h1></h1>
            </Title>
          )
        }
          <UserName>{username}</UserName>
        {
          mode === 'edit' ?
          (
            <EditStory>
              <textarea></textarea>
              <form></form>
            </EditStory>
          ) :
          (
            <Story>
              <h1></h1>
            </Story>
          )
        }
      </DeletableContent>
    </React.Fragment>
  )
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// LEAF
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PurePost = ({ id, add, delete:_delete, edit, children }) => {

      return (

        <React.Fragment>

          <Post mode='edit'></Post>

          <Delete>
            { false && <svg></svg> }
            <button onCLick={ _ => _delete(id) }>DELETE</button>
          </Delete>

          <Add>
            { false && <svg></svg> }
            <button onCLick={ _ => add() }>ADD</button>
          </Add>

          <Edit>
            <button onCLick={ _ => edit() }>ADD</button>
          </Edit>

          {
            // in children mode PurePost
            children && children
          }

        </React.Fragment>
  )
};



/**
 *
 *
 *    const PurePostConected = connect(mapStateToProps)( PurePost  ) ;
 *
      let _delete = _=>_;
      let addChildContainer = _=>_;
      let filteringlogic = _=>_;

      const childServices =_ => ({

      })
*/





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// COMPONENT
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////








class PostContainer extends React.Component {

  state = {
    uiposts:[]
  }

  constructor(props){
    super(props) ;
  }





  ///////////////////////////////////////
  ///////////////////////////////////////
  ///////////////////////////////////////
  ///////////////////////////////////////




  // componentWillMount(){}

  componentDidMount(){

  }

  componentWillReceiveProps(){

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.x === props.x;
  }


  componentDidUpdate(prevProps, prevState, snapshot){

  }
  // componentWillUnmount(){}





  ///////////////////////////////////////
  ///////////////////////////////////////
  ///////////////////////////////////////
  ///////////////////////////////////////



  collectChildren(){
    const {posts, id} = this.props ;
    // posts that have parent my id are my children
    let temp = []
    for (const [key, value] of Object.entries(posts)) {
      if(posts[key].parent === id) temp.push(posts[key]) ;
    }

    this.setState( { uiposts:temp } )

  }

  deletePost(id) {
    // children ?
    //    remove (child <PostContainer> with id) :
    //    remove (child <PostContainer> with id).<Post>

    //const {id} = this.props ;
    dispatch(
      deleteAction(id)
    );
  }

  addPost(){
    const {id} = this.props ;
    dispatch(
      addAction(
        id ,
        Math.random().toString(36).substr(-8) , // generate unique new id
        Date.now() // genrate date
      )
    ) ;
  }


  editPost(){
    // switch Post Inards
  }


  recurse({children}){
    // uiposts.map( post => (

    if(children.length) {
      return
          (
          <PostConected
            id={id}
            >
            {
              children.map(
                post => this.recurse( post.children ).bind(this))
            }
            </PostConected>)
    } else {
      return
        ( <PurePost
              id={id}
              add={ _ => addPost() }
              delete={ _ => deletePost() }
              ></PurePost> )
    }
  }





  render(){

    const {id, children} = this.props ;

    return (
      children.map( post => (
        !post.children.length ?

        ////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////

          <PurePost
            id={id}
            add={ _ => addPost() }
            delete={ _ => deletePost() }
            ></PurePost>

          :

        ////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////
          <PostConected
            id={id}
            ></PostConected>

      ))
    )
  }
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// COMPONENT
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            /**
             *
             *




// https://stackoverflow.com/questions/46003422/how-to-render-react-component-into-itself-in-a-recursive-way

class RecursiveCompletion extends React.PureComponent {



  render() {
    const { listItems } = this.props;

    return <List>
      {listItems.map(item => this.constructListItem(item)}
    </List>
  }
}
             *
             */





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// REACT-REDUX CONNECT
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [mapStateToProps(state, [ownProps]): stateProps]                 (Function)
      /**
       *
       * If this argument is specified, the new component will subscribe to Redux store updates
       * This means that any time the store is updated, mapStateToProps will be called

      ---
*/
// [mapDispatchToProps(dispatch, [ownProps]): dispatchProps]        (Object or Function)
// [mergeProps(stateProps, dispatchProps, ownProps): props]         (Function)
// export default connect(state => state)(TodoApp)

const mapStateToProps = (state, ownProps) => {
  // ownProps.posts
  return { posts: state.posts }
}

const PostConected = connect(mapStateToProps)( PostContainer  ) ;

// PostConected || purePost

// export default PostContainer ;