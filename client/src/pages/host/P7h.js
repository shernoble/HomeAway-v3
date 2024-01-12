import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';

function P7h() {
    const navigate = useNavigate();
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (files.length !== 5) {
            alert("Upload 5 images");
        } else {
            navigate('/host/p8h');
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
            <form action="/p7h" method="post" encType="multipart/form-data" onSubmit={handleFormSubmit}>
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
                <hr />
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
