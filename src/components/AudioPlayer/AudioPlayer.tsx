import React, { useState, useCallback, useMemo } from 'react';
import './AudioPlayer.scss';
//components
import ReactAudioPlayer from 'react-audio-player';
import { useDropzone } from 'react-dropzone';
//types
import { File } from '../../types/Files';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ead2ac',
    borderColor: '#30343f',
    borderWidth: 2,
    borderStyle: 'solid',
    height: '50%'
} as React.CSSProperties;

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
        ...baseStyle,
        ...(isDragActive ? activeDragStyle : {})
    }), [
        isDragActive
    ]);

    return (
        <div {...getRootProps({ style })} >
            <input {...getInputProps()} />
            <p>{file.name === "" ? 'No audio file selected. Try dragging and dropping a file.' : file.name}</p>

            <ReactAudioPlayer
                src={file.url}
                controls
            />
        </div>
    );
}

export default AudioPlayer;