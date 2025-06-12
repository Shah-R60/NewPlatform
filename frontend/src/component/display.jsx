import React, { useEffect, useState } from 'react';
import './component.css'; // Assuming you have a CSS file for styling
import LandingPage from '../calling.components/LandingPage.jsx';
function Display() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/topic/getNewestTopic', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const obj = await response.json();
                console.log('Fetched data:', obj);
                
                if (obj && obj.data) {
                    setTitle(obj.data.title);
                    setDescription(obj.data.description || []);
                    setImage(obj.data.image);
                } else {
                    setError('No topic data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Add empty dependency array

    // Function to render content blocks
    const renderContentBlock = (block, index) => {
        switch (block.type) {
            case 'text':
                return (
                    <div key={index} className="content-block text-block">
                        <p>{block.content}</p>
                    </div>
                );

            case 'image':
                return (
                    <div key={index} className="content-block image-block">
                        {/* <div style={{marginRight:"5px"}}>{(index/2)+1}</div> */}
                        <img 
                            src={block.content} 
                            alt={`Content image ${index + 1}`}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                console.error('Failed to load image:', block.content);
                            }}
                        />
                    </div>
                );

            case 'video':
                return (
                    <div key={index} className="content-block video-block">
                        {/* <div style={{marginRight:"5px"}}>{(index/2)+1}</div> */}
                        <video 
                            controls 
                            
                            onError={() => {
                                console.error('Failed to load video:', block.content);
                            }}
                        >
                            <source src={block.content} type="video/mp4" />
                            <source src={block.content} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );

            default:
                return (
                    <div key={index} className="content-block unknown-block">
                        <p style={{ color: '#666', fontStyle: 'italic' }}>
                            Unknown content type: {block.type}
                        </p>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className='loadingClass' 
            // style={{ 
            //     display: 'flex', 
            //     justifyContent: 'center', 
            //     alignItems: 'center', 
            //     height: '200px' 
            // }}
            >
                <p>Loading topic...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                color: '#e74c3c' 
            }}>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="display-container" 
        style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            // padding: '20px', 
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            color: '#2c3e50'
        }}
        >
            <div className='topicHeader'>
                Topic Details
            </div>
            
            <div className="topic-details">
                {/* Topic Title */}
                <div style={{ borderBottom: '2px solid rgb(20, 67, 149)', marginBottom:"10px" , marginTop:"10px"}}></div>
                <div className='topicName'>
                     {title}
                </div>
                <div style={{ borderBottom: '2px solid rgb(20, 67, 149)', marginBottom:"10px" , marginTop:"10px"}}></div>


                {/* Main Topic Image */}
                {image && (
                    <div className="main-image" style={{ marginBottom: '30px' ,display:"flex" , justifyContent:"center", alignContent:"center"}}>
                        <img 
                            src={image} 
                            alt={title} 
                            onError={(e) => {
                                e.target.style.display = 'none';
                                console.error('Failed to load main image:', image);
                            }}
                        />
                    </div>
                )}

                <LandingPage/>

                {/* Description Content Blocks */}
                <div className='reference' >Reference</div>
                <div className="description-content">
                    {description && description.length > 0 ? (
                        description
                            .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
                            .map((block, index) => renderContentBlock(block, index))
                    ) : (
                        <p style={{ 
                            textAlign: 'center', 
                            color: '#7f8c8d',
                            fontStyle: 'italic' 
                        }}>
                            No description content available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Display;