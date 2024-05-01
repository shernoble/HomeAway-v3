import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function P7h() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [imageUrls, setImageUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [containerContent, setContainerContent] = useState([]);
    const [dragAreaClass, setDragAreaClass] = useState('');

    

    const handleInputChange = (e) => {
        let file = e.target.files;

        if (file.length === 0) return;

        for (let i = 0; i < file.length; i++) {
            if (file[i].type.split("/")[0] !== 'image') continue;
            if (!files.some((f) => f.name === file[i].name)) {
                setFiles((prevFiles) => [...prevFiles, file[i]]);
            }
        }
    };

    useEffect(() => {
        const showImages = () => {
            setContainerContent(
                files.map((curr, index) => (
                    <div key={index} className="image">
                        <span onClick={() => delImage(index)}>&times;</span>
                        <img src={URL.createObjectURL(curr)} alt={`Uploaded ${index + 1}`} />
                    </div>
                ))
            );
        };

        showImages();
    }, [files]);

    const delImage = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragAreaClass('dragover');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragAreaClass('');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragAreaClass('');

        let file = e.dataTransfer.files;
        for (let i = 0; i < file.length; i++) {
            if (file[i].type.split("/")[0] !== 'image') continue;

            if (!files.some((f) => f.name === file[i].name)) {
                setFiles((prevFiles) => [...prevFiles, file[i]]);
            }
        }
    };
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        if (files.length !== 5) {
            alert("Upload 5 images");
        } 
        else 
        {
            const formData = new FormData();
            

// Dispatch actions to update individual image URLs in the store
files.forEach((file, index) => {
    const filePath = `C:/Users/kavya/OneDrive/Pictures/Screenshots/${file.name}`;
    
    
    // Dispatch the filename with path as the URL
    dispatch({ type: 'UPDATE_IMAGE_URL', payload: { index: index + 1, url: filePath } });
    
    formData.append(`images`, file);
});

// Now formData contains all files appended with keys "image1", "image2", etc.

            
                const response = await axios.post('http://localhost:5050/host/uploadimages', formData)

            
            
            for (const pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]); 
              }
            console.log(response.data);
            navigate('/host/p8h')
        }
    };

    const handleBack = () => {
        navigate('/host/p6h');
    };

    return (
        <HelmetProvider>
        {
            <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p7h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
        }
            <div className="navbar header">
                <h2 style={{ textDecoration: 'none' }} className="heading1">
                    Home Away
                </h2>
            </div>
            <h1 style={{ marginTop: '100px', marginLeft: '530px' }}>Add some photos of your place</h1>
            <p style={{ marginTop: '10px', marginLeft: '530px' }}>You'll need 5 photos to get started.</p>
            <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
                <div className="card" style={{ marginTop: '20px', marginLeft: '460px', width: '700px' }}>
                    <div
                        className={`drag-area ${dragAreaClass}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <span className="visible">
                            Drag & drop image here or
                            <label className="select" role="button" htmlFor="fileInput">
                                Browse
                            </label>
                        </span>
                        <span className="on-drop">Drop images here</span>
                        <input
                            id="fileInput"
                            name="images"
                            type="file"
                            accept="image/*"
                            className="file"
                            multiple
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="container" style={{ height: '150px', marginLeft: '0px', left: '0px' }}>
                        {containerContent}
                    </div>
                </div>
                <hr style={{marginTop:'30px'}}/>
                <div>
                    <button className="c1" type="button" onClick={handleBack}>
                        Back
                    </button>
                    <button className="c2" type="submit" style={{ cursor: files.length === 5 ? 'pointer' : 'not-allowed', backgroundColor: files.length === 5 ? 'black' : 'initial' , color: files.length === 5 ? 'white' : 'initial'}} onClick={handleFormSubmit}>
                        Next
                    </button>
                </div>
            </form>
        </HelmetProvider>
    );
}

export default P7h;
