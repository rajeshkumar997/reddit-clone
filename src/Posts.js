import React, { useState } from "react";
import "./Posts.css";
import PostItem from "./PostItem";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";


function Posts() {

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = React.useState(false);

  const { user, isAuthenticated, isLoading } = useAuth0();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {



    let obj = {
      upvote: Math.floor(Math.random() * 400),
      image: `https://picsum.photos/id/${Math.floor(Math.random() * 50)}/400/300`,
      title: title,
      comments_count: Math.floor(Math.random() * 400),
      user: "theindependentonline",
      subreddit: "politics",
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
    posts.map((post) => (
      <PostItem post={post} />
    ))
  }

    </div >

  );
}

export default Posts;
