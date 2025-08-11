import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './upload.module.css';

const TextIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
);

const ImageIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
);

const VideoIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
);

const UploadIcon = () => (
    <svg className={styles.iconLarge} viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
);

const DeleteIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
);

const CheckIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#48bb78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
);

// Success Modal Component
const SuccessModal = ({ isVisible, onClose, onNavigate }) => {
    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                animation: 'modalSlideIn 0.3s ease-out',
                position: 'relative'
            }}>
                <div style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <CheckIcon />
                </div>
                
                <h2 style={{
                    color: '#2d3748',
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    margin: 0
                }}>
                    Success!
                </h2>
                
                <p style={{
                    color: '#718096',
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    Your topic has been uploaded successfully and is now live for the community to explore!
                </p>
                
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={onNavigate}
                        style={{
                            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(72, 187, 120, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        View Topic
                    </button>
                    
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            color: '#718096',
                            border: '2px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.borderColor = '#cbd5e0';
                            e.target.style.color = '#4a5568';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.color = '#718096';
                        }}
                    >
                        Create Another
                    </button>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes modalSlideIn {
                        from {
                            opacity: 0;
                            transform: translateY(-50px) scale(0.9);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `
            }} />
        </div>
    );
};

function Upload() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [descriptionBlocks, setDescriptionBlocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const addTextBlock = () => {
        setDescriptionBlocks([...descriptionBlocks, {
            type: 'text',
            content: '',
            order: descriptionBlocks.length
        }]);
    };

    const addImageBlock = () => {
        setDescriptionBlocks([...descriptionBlocks, {
            type: 'image',
            content: '',
            order: descriptionBlocks.length,
            file: null
        }]);
    };

    const addVideoBlock = () => {
        setDescriptionBlocks([...descriptionBlocks, {
            type: 'video',
            content: '',
            order: descriptionBlocks.length,
            file: null
        }]);
    };

    const updateBlockContent = (index, content) => {
        const updated = [...descriptionBlocks];
        updated[index].content = content;
        setDescriptionBlocks(updated);
    };

    const updateBlockFile = (index, file) => {
        const updated = [...descriptionBlocks];
        updated[index].file = file;
        setDescriptionBlocks(updated);
    };

    const removeBlock = (index) => {
        const updated = descriptionBlocks.filter((_, i) => i !== index);
        // Reorder remaining blocks
        const reordered = updated.map((block, i) => ({ ...block, order: i }));
        setDescriptionBlocks(reordered);
    };

    const SubmitEvent = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !image || descriptionBlocks.length === 0) {
            alert("Please fill all required fields");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('TopicImage', image);

            // Process description blocks
            let fileIndex = 0;
            const processedBlocks = descriptionBlocks.map(block => {
                if ((block.type === 'image' || block.type === 'video') && block.file) {
                    formData.append('descriptionMedia', block.file);
                    return { ...block, fileIndex: fileIndex++, file: undefined };
                }
                return { ...block, file: undefined };
            });

            formData.append('description', JSON.stringify(processedBlocks));

            const response = await fetch('http://localhost:5000/api/topic/uploadTopic', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            if(response.status === 403)
            {
                alert("You are not authorized to perform this action. Please log in as an admin.",);
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);
            
            // Reset form
            setTitle("");
            setImage(null);
            setDescriptionBlocks([]);
            document.getElementById('image').value = '';
            
            // Show success modal instead of alert
            setShowSuccessModal(true);
            

        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle success modal actions
    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const handleNavigateToDisplay = () => {
        setShowSuccessModal(false);
        navigate('/display'); // Adjust this path based on your routing setup
    };

    return (
        <>
            <SuccessModal 
                isVisible={showSuccessModal}
                onClose={handleCloseModal}
                onNavigate={handleNavigateToDisplay}
            />
            
            <div className={styles.uploadContainer}>
                <div className={styles.uploadForm}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New Topic</h1>
                    <p className={styles.subtitle}>Share your knowledge with the community</p>
                </div>

                <form onSubmit={SubmitEvent}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="title">Topic Title</label>
                        <input 
                            id="title"
                            className={styles.textInput}
                            value={title} 
                            placeholder="Enter an engaging title for your topic" 
                            onChange={(e) => setTitle(e.target.value)} 
                            type="text" 
                            required
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="coverImage">Cover Image</label>
                        <input 
                            type="file" 
                            id="image" 
                            className={styles.fileInput}
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                        <label 
                            htmlFor="image" 
                            className={`${styles.fileInputLabel} ${image ? styles.hasFile : ''}`}
                        >
                            <UploadIcon />
                            {image ? `Selected: ${image.name}` : 'Choose cover image for your topic'}
                        </label>
                    </div>

                    <div className={styles.blocksSection}>
                        <div className={styles.blocksHeader}>
                            <h3 className={styles.blocksTitle}>Content Blocks</h3>
                            <div className={styles.addButtonsGroup}>
                                <button type="button" className={styles.addButton} onClick={addTextBlock}>
                                    <TextIcon />
                                    Add Text
                                </button>
                                <button type="button" className={styles.addButton} onClick={addImageBlock}>
                                    <ImageIcon />
                                    Add Image
                                </button>
                                <button type="button" className={styles.addButton} onClick={addVideoBlock}>
                                    <VideoIcon />
                                    Add Video
                                </button>
                            </div>
                        </div>

                        {descriptionBlocks.length === 0 ? (
                            <div className={styles.noBlocks}>
                                No content blocks yet. Add some text, images, or videos to build your topic.
                            </div>
                        ) : (
                            descriptionBlocks.map((block, index) => (
                                <div key={index} className={styles.block}>
                                    <div className={styles.blockHeader}>
                                        <div className={styles.blockTitle}>
                                            {block.type === 'text' && <TextIcon />}
                                            {block.type === 'image' && <ImageIcon />}
                                            {block.type === 'video' && <VideoIcon />}
                                            Block {index + 1}
                                            <span className={styles.blockType}>{block.type}</span>
                                        </div>
                                        <button 
                                            type="button" 
                                            className={styles.removeButton}
                                            onClick={() => removeBlock(index)}
                                            title="Remove this block"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                    
                                    {block.type === 'text' && (
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="Enter your text content here..."
                                            value={block.content}
                                            onChange={(e) => updateBlockContent(index, e.target.value)}
                                            required
                                        />
                                    )}
                                    
                                    {block.type === 'image' && (
                                        <>
                                            <input
                                                type="file"
                                                id={`image-block-${index}`}
                                                className={styles.fileInput}
                                                accept="image/*"
                                                onChange={(e) => updateBlockFile(index, e.target.files[0])}
                                                required
                                            />
                                            <label 
                                                htmlFor={`image-block-${index}`}
                                                className={`${styles.fileInputLabel} ${block.file ? styles.hasFile : ''}`}
                                            >
                                                <ImageIcon />
                                                {block.file ? `Selected: ${block.file.name}` : 'Choose image for this block'}
                                            </label>
                                        </>
                                    )}

                                    {block.type === 'video' && (
                                        <>
                                            <input
                                                type="file"
                                                id={`video-block-${index}`}
                                                className={styles.fileInput}
                                                accept="video/*"
                                                onChange={(e) => updateBlockFile(index, e.target.files[0])}
                                                required
                                            />
                                            <label 
                                                htmlFor={`video-block-${index}`}
                                                className={`${styles.fileInputLabel} ${block.file ? styles.hasFile : ''}`}
                                            >
                                                <VideoIcon />
                                                {block.file ? `Selected: ${block.file.name}` : 'Choose video for this block'}
                                            </label>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? (
                            <>
                                <div className={styles.loadingSpinner}></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <UploadIcon />
                                Publish Topic
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Upload;