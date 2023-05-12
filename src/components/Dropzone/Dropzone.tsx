import { IconButton } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';

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
    onChange: (files: File[], ...error: any[]) => void;
    error?: boolean;
};

type DropResult = 'idle' | 'rejected';

const StyledDropzone = (props: DropzoneProps) => {
    const [imageUrl, setImageUrl] = useState('');
    const [lastResult, setLastResult] = useState<DropResult>('idle');
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, inputRef } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDropAccepted: (files, event) => {
            props.onChange(files, { target: { value: files[0] } });
            URL.revokeObjectURL(imageUrl);
            if (files[0]) {
                setImageUrl(URL.createObjectURL(files[0]));
            } else {
                setImageUrl('');
            }
        },
        onDropRejected: () => setLastResult('rejected'), //, 'Image rejected']),
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept || imageUrl ? acceptStyle : {}),
            ...((!isDragAccept && lastResult === 'rejected') || isDragReject || props.error ? rejectStyle : {}),
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: 'contain' as const,
            backgroundRepeat: 'no-repeat' as const,
            backgroundPosition: 'center' as const,
            height: imageUrl ? 300 : 100,
            transition: 'all 0.5s ease-in-out',
        }),
        [isFocused, isDragAccept, isDragReject, props.error, lastResult, imageUrl]
    );

    return (
        <div className='container' style={{ position: 'relative' }}>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p style={labelStyle}>
                    {imageUrl
                        ? 'Image accepted'
                        : lastResult === 'rejected'
                        ? 'Image rejected'
                        : "Drag 'n' drop an image here"}
                </p>
            </div>
            {imageUrl && (
                <IconButton
                    onClick={() => {
                        if (inputRef.current) {
                            inputRef.current.value = '';
                        }
                        URL.revokeObjectURL(imageUrl);
                        setImageUrl('');
                        props.onChange([]);
                    }}
                    style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}
        </div>
    );
};

export default StyledDropzone;
