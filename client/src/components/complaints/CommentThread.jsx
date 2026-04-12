import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatRelativeTime } from '../../utils/formatters';
import './CommentThread.css';

const CommentThread = ({ comments = [], onAddComment, loading }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment('');
    } finally {
      setSubmitting(false);
    }
  };

  const isOwnComment = (comment) => user?.id === comment.user_id;

  return (
    <div className="comment-thread">
      <h6 className="mb-3">Comments</h6>
      
      {/* Comment List */}
      <div className="comments-list mb-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div 
              key={comment.id} 
              className={`comment-item ${isOwnComment(comment) ? 'own' : 'other'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="comment-avatar">
                {comment.user_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-author">
                    {comment.user_name}
                    {comment.user_role === 'admin' && (
                      <span className="badge bg-primary ms-1">Admin</span>
                    )}
                  </span>
                  <span className="comment-time">
                    {formatRelativeTime(comment.created_at)}
                  </span>
                </div>
                <div className="comment-text">{comment.comment}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-chat-dots fs-1 d-block mb-2 opacity-50"></i>
            <p className="mb-0">No comments yet</p>
            <small>Be the first to add a comment!</small>
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
          />
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={submitting || !newComment.trim()}
          >
            {submitting ? (
              <span className="spinner-border spinner-border-sm" role="status"></span>
            ) : (
              <i className="bi bi-send"></i>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentThread;