import React, { useState, useCallback, useMemo } from 'react';
import './PDFViewer.scss';
import { useDropzone } from 'react-dropzone';
//@ts-ignore
import FileViewer from 'react-file-viewer';
//types
import { File } from '../../types/Files';

const activeDragStyle = {
    backgroundColor: '#f7e3c4',
    borderStyle: 'dashed',
} as React.CSSProperties;

const PDFViewer = () => {
    const [file, setFile] = useState<File>({
        name: "",
        url: "",
        type: ""
    });

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: any) => {
            setFile({
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type.split('/')[1]
            })
        })

    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const style = useMemo(() => ({
        ...(isDragActive ? activeDragStyle : {})
    }), [
        isDragActive
    ]);

    return (
        <div {...getRootProps({ style })} className="PDFViewer">
            <input {...getInputProps()} />
            {file.name === "" ? isDragActive ? <b>Drop here!</b> : <p>No PDF file selected. Try dragging and dropping a file.</p> : <div />}
            {file.url === "" ? <div /> : <div className="horizontal-flex-container max-size">
                <FileViewer
                    fileType={file.type}
                    filePath={file.url}
                    onError={(error: any) => console.log(error)}
                    style={{ width: '100%' }}
                />
            </div>}

        </div>
    );
}

export default PDFViewer;