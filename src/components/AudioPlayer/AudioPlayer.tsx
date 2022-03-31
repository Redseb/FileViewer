import React, { useState, useCallback, useMemo } from 'react';
import './AudioPlayer.scss';
//components
import ReactAudioPlayer from 'react-audio-player';
import { useDropzone } from 'react-dropzone';
//types
import { File } from '../../types/Files';

const activeDragStyle = {
    backgroundColor: '#f7e3c4',
    borderStyle: 'dashed',
} as React.CSSProperties;

const AudioPlayer = () => {
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
                type: file.type
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
        <div {...getRootProps({ style })} className="AudioPlayer">
            <input {...getInputProps()} />
            <p>{file.name === "" ? isDragActive ? <b>Drop here!</b> : 'No audio file selected. Try dragging and dropping a file.' : file.name}</p>

            <ReactAudioPlayer
                src={file.url}
                controls
            />
        </div>
    );
}

export default AudioPlayer;