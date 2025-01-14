import * as React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for styling
import { MainInterface } from '../../models/main-interface/MainInterface';
import { deepClone } from '../../utility/deepClone';

const WYSIWYGDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const [editorContent, setEditorContent] = useState<string>('');

    const handleContentChange = (content: string) => {
        setEditorContent(content);
        // Optionally update mainInterface if needed
        var copyMain = deepClone(mainInterface);
        copyMain.wysiwygObject.textFormInputString = content;
        setMainInterface(copyMain);
    };

    return (
        <div>
            <p>WYSIWYG works!</p>
            <div>Title:</div>
            <ReactQuill
                value={editorContent}
                onChange={handleContentChange}
                theme="snow" // You can use "bubble" for a different theme
                style={{border:'solid 1px gray'} }
            />
            <div>Day</div>
            {/*<p>Preview:</p>*/}
            {/*<div dangerouslySetInnerHTML={{ __html: editorContent }} />*/}
        </div>
    );
}

export default WYSIWYGDisplayComponent;