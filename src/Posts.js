import React, { useEffect, useState } from "react";
import "./Posts.css";
import PostItem from "./PostItem";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const getLocalItems = () => {
  let list = localStorage.getItem('post');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('post'))
  } else {
    return [];
  }
}


function Posts() {

  const [posts, setPosts] = useState(getLocalItems());
  const [title, setTitle] = useState("");
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated } = useAuth0();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('post', JSON.stringify(posts))
  }, [posts]);

  const deleteItem = (id) => {
    if (isAuthenticated) {
      const updatedItems = posts.filter((post) => {
        return id !== post.id;
      });
      setPosts(updatedItems);
    } else {
      alert("Please login first..");
    }
  };

  const handleSave = () => {
    let newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;

    let obj = {
      id: newId,
      upvote: Math.floor(Math.random() * 400),
      image: `https://picsum.photos/id/${Math.floor(Math.random() * 50)}/400/300`,
      title: title,
      comments_count: Math.floor(Math.random() * 400),
      user: " the independent online ",
      subreddit: "persion",
    }

    setPosts([...posts, obj]);
    setOpen(false);
  }

  return (
    <div className="posts">

      <div className="post">

        {
          isAuthenticated ? (
            <>
              <Button variant="contained" onClick={handleClickOpen}>Add new post</Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new post</DialogTitle>
                <DialogContent>
                  <DialogContentText>Post title</DialogContentText>
                  <TextField id="outlined-basic" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (<><Button variant="contained" onClick={() => alert("Please Login . . . .")}>Add new post</Button>

          </>)
        }

      </div>

      {
        posts.map((post) => {
          return (
            <div className="eachItem" key={post.id}>
              <PostItem post={post} />
              <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(post.id)} ></i>
            </div>
          )
        })
      }

    </div >

  );
}

export default Posts;
