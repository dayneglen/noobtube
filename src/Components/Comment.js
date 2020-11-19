import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios'

const Comment = props => {
    const { commentInfo } = props;
    const [edit, setEdit] = useState(false),
          [editedComment, setEditedComment] = useState(commentInfo.comment)

     const user = useSelector((state) => state.user);

     const handleEdit = () => {
         props.editComment(commentInfo.comment_id, editedComment);
         setEdit(false);
     }
    
    
    return (
      <section className="comment-individual-section">
        <section className="left-comment-info">
          <div className="comment-img-container">
            <img src={commentInfo.picture_url} alt="profile" />
          </div>
          <div className="comment-info">
            <p className="username-comment">{commentInfo.username}</p>
            {edit ? (
              commentInfo.username === user.username ? (
                <input
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
              ) : (
                <p>{commentInfo.comment}</p>
              )
            ) : (
              <p>{commentInfo.comment}</p>
            )}
          </div>
        </section>

        {commentInfo.username === user.username ? (
          <section className="comment-btn">
            {edit ? (
              <section>
                <p onClick={handleEdit}>Save</p>
                <p onClick={() => setEdit(false)}>Cancel</p>
              </section>
            ) : (
              <section className='comments-buttons'>
                <p onClick={() => setEdit(true)}>Edit</p>
                <p onClick={() => props.deleteComment(commentInfo.comment_id)}>Delete</p>
              </section>
            )}
          </section>
        ) : null}
      </section>
    );
}

export default Comment;