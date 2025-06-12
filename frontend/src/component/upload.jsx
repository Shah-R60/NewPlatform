import React, { useState } from "react";

function Upload() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [descriptionBlocks, setDescriptionBlocks] = useState([]);
    const [loading, setLoading] = useState(false);

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

    // Add video block function
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
            
            alert("Topic uploaded successfully!");
            

        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={SubmitEvent} style={{ display: 'flex', flexDirection: "column", gap: '10px' }}>
                <input 
                    value={title} 
                    placeholder="Title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    type="text" 
                    required
                />
                
                <input 
                    type="file" 
                    id="image" 
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />

                <div>
                    <h3>Description Blocks:</h3>
                    <button type="button" onClick={addTextBlock}>Add Text</button>
                    <button type="button" onClick={addImageBlock}>Add Image</button>
                    <button type="button" onClick={addVideoBlock}>Add Video</button>
                </div>

                {descriptionBlocks.map((block, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <p>Block {index + 1} - {block.type}</p>
                        
                        {block.type === 'text' && (
                            <textarea
                                placeholder="Enter text content"
                                value={block.content}
                                onChange={(e) => updateBlockContent(index, e.target.value)}
                                rows={3}
                                required
                            />
                        )}
                        
                        {block.type === 'image' && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateBlockFile(index, e.target.files[0])}
                                required
                            />
                        )}

                        {block.type === 'video' && (
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => updateBlockFile(index, e.target.files[0])}
                                required
                            />
                        )}
                        
                        <button type="button" onClick={() => removeBlock(index)}>Remove</button>
                    </div>
                ))}

                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        </>
    );
}

export default Upload;