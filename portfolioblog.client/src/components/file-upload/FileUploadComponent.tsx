import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { MainInterface } from '../../models/main-interface/MainInterface';
import { deepClone } from '../../utility/deepClone';
import { aspnetUrl } from '../../environment/environment';
import { BlogArticle } from '../../models/blog/blog-article/BlogArticle';
import { CalendarMonths } from '../../models/blog/blog-article/CalendarMonths';
import { ArticleCategories } from '../../models/blog/blog-article/ArticleCategories';

const FileUploadComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);

        try {
            const response = await axios.post(`${aspnetUrl}/api/Fileupload/uploadfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure correct content type
                },
            });

            if (response.status === 200) {
                const result = response.data; // Assuming the backend returns the file info

                alert('File uploaded successfully!');
                console.log(response.data);

                // Assuming the backend returns the file name as 'filename'
                setMainInterface(prevState => {
                    const copyMain: MainInterface = deepClone(prevState);

                    if (copyMain.newArticleObject.newArticle) {
                        copyMain.newArticleObject.newArticle.photoPath = result.fileName; // Update photoPath with the returned filename
                    }
                    return copyMain;
                });
            } else {
                alert('File upload failed!');
            }
        } catch (error) {
            alert('Error uploading file!');
            console.error(error); // Log the error for debugging
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control form-control-sm me-2" // Smaller input field with margin to the right
                />
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleUpload}
                    disabled={uploading}
                    style={{
                        width:'220px',
                        padding: '6px 12px', // Smaller padding for a more compact button
                        fontSize: '14px', // Smaller font size for consistency
                    }}
                >
                    {uploading ? 'Uploading...' : 'Select File and Upload'}
                </button>
            </div>
        </div>
    );

};

export default FileUploadComponent;
