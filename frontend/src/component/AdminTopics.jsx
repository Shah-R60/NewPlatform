import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminTopics.module.css";

const DeleteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const ConfirmModal = ({ isVisible, onConfirm, onCancel, topicName }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete <strong>"{topicName}"</strong>?
        </p>
        <p className={styles.warningText}>This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isVisible: false,
    topicId: null,
    topicName: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/topic/getAllTopics", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch topics");
      }

      const data = await response.json();
      setTopics(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleDeleteClick = (topicId, topicName) => {
    setDeleteModal({
      isVisible: true,
      topicId,
      topicName,
    });
  };

  const handleConfirmDelete = async () => {
    const { topicId, topicName } = deleteModal;
    try {
      const response = await fetch(`http://localhost:5000/api/topic/${topicId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error("Failed to delete topic");
      }

      // Remove the deleted topic from the list
      setTopics(topics.filter((topic) => topic._id !== topicId));
      setSuccessMessage(`"${topicName}" deleted successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting topic:", err);
    } finally {
      setDeleteModal({ isVisible: false, topicId: null, topicName: "" });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isVisible: false, topicId: null, topicName: "" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDescriptionText = (description) => {
    if (!description || !Array.isArray(description)) {
      return "No description available";
    }
    
    // Find the first text type in description array
    const textItem = description.find(item => item.type === "text");
    if (textItem && textItem.content) {
      const text = textItem.content;
      return text.length > 150 ? text.substring(0, 150) + "..." : text;
    }
    
    return "No description available";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin - Manage Topics</h1>
        <button className={styles.refreshBtn} onClick={fetchTopics}>
          <RefreshIcon />
          <span>Refresh</span>
        </button>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading topics...</p>
        </div>
      ) : topics.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No topics found</p>
        </div>
      ) : (
        <div className={styles.topicsGrid}>
          {topics.map((topic) => (
            <div key={topic._id} className={styles.topicCard}>
              {topic.image && (
                <div className={styles.topicImageContainer}>
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className={styles.topicImage}
                  />
                </div>
              )}
              <div className={styles.topicContent}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <p className={styles.topicDescription}>
                  {getDescriptionText(topic.description)}
                </p>
                <div className={styles.topicMeta}>
                  <span className={styles.topicDate}>
                    {formatDate(topic.createdAt)}
                  </span>
                  {topic.owner && (
                    <span className={styles.topicOwner}>
                      By: {topic.owner.username || topic.owner.fullName}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.topicActions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteClick(topic._id, topic.title)}
                >
                  <DeleteIcon />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isVisible={deleteModal.isVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        topicName={deleteModal.topicName}
      />
    </div>
  );
};

export default AdminTopics;
