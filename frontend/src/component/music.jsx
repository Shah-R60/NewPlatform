import React, { useEffect, useState } from "react";
import "./component.css";

function Music() {
     const [title, setTitle] = useState("");
     const [artist, setArtist] = useState("");
     const [musicFile, setMusicFile] = useState(null);
     const [status, setStatus] = useState("");
     const [latest, setLatest] = useState(null);
     const [loading, setLoading] = useState(false);
     const [fetching, setFetching] = useState(false);
     const [deleting, setDeleting] = useState(false);

     const fetchLatest = async () => {
          try {
               setFetching(true);
               setStatus("");
               const res = await fetch("http://localhost:5000/api/music/latest");
               if (!res.ok) {
                    throw new Error(`Failed to load latest music (${res.status})`);
               }
               const data = await res.json();
               setLatest(data?.data || null);
          } catch (err) {
               setStatus(err.message);
               setLatest(null);
          } finally {
               setFetching(false);
          }
     };

     useEffect(() => {
          fetchLatest();
     }, []);

     const handleUpload = async (e) => {
          e.preventDefault();
          if (!title.trim() || !musicFile) {
               setStatus("Title and music file are required.");
               return;
          }

          setLoading(true);
          setStatus("");

          try {
               const formData = new FormData();
               formData.append("title", title.trim());
               if (artist.trim()) {
                    formData.append("artist", artist.trim());
               }
               formData.append("musicFile", musicFile);

               const res = await fetch("http://localhost:5000/api/music/uploadMusic", {
                    method: "POST",
                    body: formData,
                    credentials: "include"
               });

               if (res.status === 401 || res.status === 403) {
                    setStatus("Not authorized. Please log in as admin.");
                    return;
               }

               if (!res.ok) {
                    throw new Error(`Upload failed (${res.status})`);
               }

               const data = await res.json();
               setStatus("Upload successful.");
               setTitle("");
               setArtist("");
               setMusicFile(null);
               fetchLatest();
          } catch (err) {
               setStatus(err.message);
          } finally {
               setLoading(false);
          }
     };

     const handleDelete = async () => {
          if (!latest?._id) {
               setStatus("No music to delete.");
               return;
          }

          setDeleting(true);
          setStatus("");

          try {
               const res = await fetch(`http://localhost:5000/api/music/${latest._id}`, {
                    method: "DELETE",
                    credentials: "include"
               });

               if (res.status === 401 || res.status === 403) {
                    setStatus("Not authorized. Please log in as admin.");
                    return;
               }

               if (!res.ok) {
                    throw new Error(`Delete failed (${res.status})`);
               }

               setStatus("Music deleted.");
               setLatest(null);
          } catch (err) {
               setStatus(err.message);
          } finally {
               setDeleting(false);
          }
     };

     return (
          <div className="music-layout">
               <div className="music-card">
                    <h2>Upload Music</h2>
                    <p className="music-subtext">Admins can add a new track.</p>
                    <form onSubmit={handleUpload} className="music-form">
                         <label className="music-label">
                              Title
                              <input
                                   className="music-input"
                                   type="text"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   placeholder="Song title"
                                   required
                              />
                         </label>

                         <label className="music-label">
                              Artist (optional)
                              <input
                                   className="music-input"
                                   type="text"
                                   value={artist}
                                   onChange={(e) => setArtist(e.target.value)}
                                   placeholder="Artist name"
                              />
                         </label>

                         <label className="music-label">
                              File
                              <input
                                   className="music-input"
                                   type="file"
                                   accept="audio/*"
                                   onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                                   required
                              />
                         </label>

                         <button className="music-button" type="submit" disabled={loading}>
                              {loading ? "Uploading..." : "Upload"}
                         </button>
                         {status && <p className="music-status">{status}</p>}
                    </form>
               </div>

               <div className="music-card">
                    <h2>Latest Music</h2>
                    <p className="music-subtext">Listen to the most recent upload.</p>
                    <div className="music-actions">
                         <button className="music-button secondary" onClick={fetchLatest} disabled={fetching}>
                              {fetching ? "Refreshing..." : "Refresh"}
                         </button>
                         {latest && (
                              <button className="music-button danger" onClick={handleDelete} disabled={deleting}>
                                   {deleting ? "Deleting..." : "Delete"}
                              </button>
                         )}
                    </div>
                    {latest ? (
                         <div className="music-latest">
                              <p className="music-title">{latest.title}</p>
                              {latest.artist && <p className="music-artist">by {latest.artist}</p>}
                              <audio controls className="music-player">
                                   <source src={latest.url} />
                                   Your browser does not support the audio element.
                              </audio>
                         </div>
                    ) : (
                         <p className="music-status">No music available yet.</p>
                    )}
               </div>
          </div>
     );
}

export default Music;
