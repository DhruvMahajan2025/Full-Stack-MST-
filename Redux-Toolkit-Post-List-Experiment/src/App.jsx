import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addPost,
  deletePost,
  editPost,
  toggleLike,
  clearPosts
} from "./features/posts/postsSlice";

function App() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts.posts
  );

  // Add post
  const handleAddPost = () => {
    if (text.trim() === "") {
      return;
    }

    dispatch(addPost(text.trim()));

    setText("");
  };

  // Start editing
  const handleEditStart = (post) => {
    setEditingId(post.id);
    setEditText(post.text);
  };

  // Save edited post
  const handleEditSave = (id) => {
    if (editText.trim() === "") {
      return;
    }

    dispatch(
      editPost({
        id,
        text: editText.trim()
      })
    );

    setEditingId(null);
    setEditText("");
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  // Search + filter
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || post.liked;

    return matchesSearch && matchesFilter;
  });

  // Total likes
  const totalLikes = posts.filter(
    (post) => post.liked
  ).length;

  return (
    <div className="app">

      {/* Main Container */}
      <div className="container">

        {/* Header */}
        <header className="header">
          <div>
            <p className="eyebrow">
              REDUX TOOLKIT
            </p>

            <h1>
              Post Manager
            </h1>

            <p className="subtitle">
              Create, manage and organize your posts.
            </p>
          </div>

          <div className="stats">
            <div className="stat-card">
              <span>Posts</span>
              <strong>{posts.length}</strong>
            </div>

            <div className="stat-card">
              <span>Likes</span>
              <strong>{totalLikes}</strong>
            </div>
          </div>
        </header>

        {/* Create Post */}
        <section className="create-section">

          <div className="section-title">
            <h2>Create a post</h2>

            <span>
              {text.length}/280
            </span>
          </div>

          <textarea
            value={text}
            maxLength={280}
            placeholder="What's on your mind?"
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <div className="create-footer">

            <span className="hint">
              Share something with your audience
            </span>

            <button
              className="primary-button"
              onClick={handleAddPost}
              disabled={!text.trim()}
            >
              <span>＋</span>
              Add Post
            </button>

          </div>

        </section>

        {/* Search + Filters */}
        <section className="controls">

          <div className="search-box">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="filters">

            <button
              className={
                filter === "all"
                  ? "filter active"
                  : "filter"
              }
              onClick={() =>
                setFilter("all")
              }
            >
              All
            </button>

            <button
              className={
                filter === "liked"
                  ? "filter active"
                  : "filter"
              }
              onClick={() =>
                setFilter("liked")
              }
            >
              ❤️ Liked
            </button>

          </div>

        </section>

        {/* Posts Header */}
        <div className="posts-header">

          <div>
            <h2>Your Posts</h2>

            <p>
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1
                ? "post"
                : "posts"}{" "}
              found
            </p>
          </div>

          {posts.length > 0 && (
            <button
              className="clear-button"
              onClick={() =>
                dispatch(clearPosts())
              }
            >
              Clear All
            </button>
          )}

        </div>

        {/* Posts */}
        <section className="posts-list">

          {filteredPosts.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                📝
              </div>

              <h3>
                No posts found
              </h3>

              <p>
                {posts.length === 0
                  ? "Create your first post above."
                  : "Try changing your search or filter."}
              </p>

            </div>

          ) : (

            filteredPosts.map((post) => (

              <article
                className="post-card"
                key={post.id}
              >

                {/* Post Top */}
                <div className="post-top">

                  <div className="avatar">
                    P
                  </div>

                  <div className="post-meta">

                    <strong>
                      My Post
                    </strong>

                    <span>
                      Today · {post.createdAt}
                    </span>

                  </div>

                </div>

                {/* Post Content */}
                {editingId === post.id ? (

                  <div className="edit-area">

                    <textarea
                      value={editText}
                      maxLength={280}
                      onChange={(e) =>
                        setEditText(
                          e.target.value
                        )
                      }
                    />

                    <div className="edit-actions">

                      <button
                        className="cancel-button"
                        onClick={
                          handleEditCancel
                        }
                      >
                        Cancel
                      </button>

                      <button
                        className="save-button"
                        onClick={() =>
                          handleEditSave(
                            post.id
                          )
                        }
                      >
                        Save Changes
                      </button>

                    </div>

                  </div>

                ) : (

                  <p className="post-text">
                    {post.text}
                  </p>

                )}

                {/* Post Actions */}
                {editingId !== post.id && (

                  <div className="post-actions">

                    <button
                      className={
                        post.liked
                          ? "action liked"
                          : "action"
                      }
                      onClick={() =>
                        dispatch(
                          toggleLike(post.id)
                        )
                      }
                    >
                      {post.liked
                        ? "❤️ Liked"
                        : "♡ Like"}
                    </button>

                    <button
                      className="action"
                      onClick={() =>
                        handleEditStart(post)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="action delete"
                      onClick={() =>
                        dispatch(
                          deletePost(post.id)
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                )}

              </article>

            ))

          )}

        </section>

        {/* Footer */}
        <footer>
          Built with React + Redux Toolkit
        </footer>

      </div>

    </div>
  );
}

export default App;