import React, { useRef } from 'react';

const PhotoUploadFormComponent = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const newFileName = file.name.replace(/\s+/g, '_'); // Replace spaces with underscores

            console.log("Original File Name:", file.name);
            console.log("Renamed File Name:", newFileName);

            // Send the file to the server
            const formData = new FormData();
            formData.append('file', file, newFileName); // Pass the new file name

            try {
                const response = await fetch('https://localhost:5001/api/fileupload', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button
                className="btn btn-primary"
                onClick={handleButtonClick}
            >
                Select File
            </button>
        </div>
    );
};

export default PhotoUploadFormComponent;
