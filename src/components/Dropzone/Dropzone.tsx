import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    padding: '16.5px 14px',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginTop: 8,
    marginBottom: 4,
    color: 'rgba(0, 0, 0, 0.6)',
};

const focusedStyle = {
    borderColor: '#2196f3',
    color: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
    color: '#00e676',
};

const rejectStyle = {
    borderColor: '#d63e3e',
    color: '#d63e3e',
};

const labelStyle = {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
    padding: 0,
};

type DropzoneProps = {
    onChange: (files:File[], ...error: any[]) => void;
    error?: boolean;
};

type DropResult = 'idle' | 'accepted' | 'rejected';

const StyledDropzone = (props: DropzoneProps) => {
    const [lastResult, setLastResult] = useState<[DropResult, string]>(['idle', "Drag 'n' drop an image here"]);
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDropAccepted: (files, event) => {
            props.onChange(files, {target:{value:files[0]}});
            setLastResult(['accepted', 'Image accepted']);
        },
        onDropRejected: () => setLastResult(['rejected', 'Image rejected']),
    });
    
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept || lastResult[0] === 'accepted' ? acceptStyle : {}),
            ...((!isDragAccept && lastResult[0] === 'rejected') || isDragReject || props.error ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject, props.error, lastResult]
    );

    return (
        <div className='container'>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p style={labelStyle}>{lastResult[1]}</p>
            </div>
        </div>
    );
};

export default StyledDropzone;
