/*jshint esversion: 6 */

import React, {useState,useEffect} from 'react';
import './App.css';
import Post from './post';
import {db, auth} from './firebase';
import {makeStyles}from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core';
import ImageUpload from './imageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle()
{
  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user,setUser] = useState(null);

  useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
        if(authUser){
            //user has logged in
            console.log(authUser);
            setUser(authUser);
          }
        else{
          //user has logged out
          setUser(null);
        }
      });
  return() => {
    unsubscribe();
  };
}, [user,username]);


  useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);


  const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName:username
      });
    })
    .catch((error)=> alert(error.message));
    setOpen(false);
  };

const signIn = (event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message));
  setOpenSignIn(false);
};


  return (
    <div className = "app" >

    {user?.displayName ?(
      <ImageUpload username = {user.displayName}/>
    ):
    (<h3>Sorry,you need to login first!!</h3>)
  }


      <Modal open = {open} onClose = {handleClose}>
        <div style = {modalStyle}
            className = {classes.paper} >
          <form class = 'app__signup'>
              <center>
                <img className = "app__headerimage"
                src = "https://likigram.com/themes/likigram/assets/images/instagram-text-logo.png"
                alt = "" />
              </center>
              <Input
              placeholder = 'username'
              type = 'text'
              value = {username}
              onChange={(e) => setUsername(e.target.value)}/>

              <Input
              placeholder = 'email'
              type = 'text'
              value = {email}
              onChange={(e) => setEmail(e.target.value)}/>

              <Input
              placeholder = 'password'
              type = 'password'
              value = {password}
              onChange={(e) => setPassword(e.target.value)}/>

              <Button type='submit' onClick ={signUp}> Sign Up </Button>
          </form>
        </div>
    </Modal>




    <Modal open = {openSignIn} onClose = {()=>setOpenSignIn(false)}>
    <div style = {modalStyle} className = {classes.paper}>
    <form class = 'app__signup'>
          <center >
                  <img className = "app__headerimage"
                  src = "https://ultimatemember.com/wp-content/uploads/bb-plugin/cache/instagram-circle.png"
                  alt = "" />
            </center>

          <Input
          placeholder = 'email'
          type = 'text'
          value = {email}
          onChange={(e) => setEmail(e.target.value)}/>

          <Input
          placeholder = 'password'
          type = 'password'
          value = {password}
          onChange={(e) => setPassword(e.target.value)}/>
          <Button type='submit' onClick ={signIn}>Sign In </Button>
        </form>
      </div>
    </Modal>



    <div className = 'app__header' >
        <img className = "app__headerimage"
        src = "https://likigram.com/themes/likigram/assets/images/instagram-text-logo.png"
        alt = "" />

        {user ?
          (<button type="button" onClick={()=>auth.signOut()}>logout</button>)
        :
          (<div className = "app__logincontainer">
              <button type="button" onClick={()=>setOpenSignIn(true)}>Sign In</button>
              <button type="button" onClick={handleOpen}>Sign Up</button>
          </div>
        )}

    </div>

<div className = 'app_posts'>
<div className = 'app_postsLeft'>
        { posts.map(({id,post}) =>(
            <Post
              key = {id}
              postid = {id}
              user = {user}
              username = {post.username}
              caption = {post.caption}
              imageUrl = {post.imageUrl}
            />
          ))
        }
</div>
<div className = 'app_postsRight'>
        <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
</div>



</div>
  </div>
  );
}

export default App;
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
//
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }
//
// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();
//
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }
//
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));
//
// export default function SimpleModal() {
//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);
//
//   const handleOpen = () => {
//     setOpen(true);
//   };
//
//   const handleClose = () => {
//     setOpen(false);
//   };
//
//   const body = (
//     <div style={modalStyle} className={classes.paper}>
//       <h2 id="simple-modal-title">Text in a modal</h2>
//       <p id="simple-modal-description">
//         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//       </p>
//       <SimpleModal />
//     </div>
//   );
//
//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Sign Up
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//   );
// }
