import { useState, useCallback } from 'react';
import './AudioPlayer.scss';
//components
import ReactAudioPlayer from 'react-audio-player';
import { useDropzone } from 'react-dropzone';

type File = {
    name: string;
    url: string;
    type: string;
}

const AudioPlayer = () => {
    const [file, setFile] = useState<File>({
        name: "",
        url: "",
        type: ""
    });

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader()
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            setFile({
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type
            })
        })

    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className="AudioPlayer">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{file.name === "" ? 'No audio file selected. Try dragging and dropping a file.' : file.name}</p>

            </div>
            <ReactAudioPlayer
                src={file.url}
                controls
            />
        </div>
    );
}

export default AudioPlayer;