import 'ace-builds/src-noconflict/ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/ext-language_tools';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import AceEditor from 'react-ace';

import { ContentCreateElement, ContentType } from '../../api/api';

type ContentCodeEditorProps = {
    value?: ContentCreateElement;
    onChange?: (element: ContentCreateElement) => void;
};

const languages = {
    cpp: 'C++',
    csharp: 'C#',
    java: 'Java',
    javascript: 'JavaScript',
    json: 'JSON',
    markdown: 'Markdown (HTML, XML)',
    php: 'PHP',
    python: 'Python',
    sql: 'SQL',
};

const ContentCodeEditor = (props: ContentCodeEditorProps) => {
    return (
        <div style={{ position: 'relative', padding: '1em', height: '100%' }}>
            <AceEditor
                mode={props.value?.value === 'cpp' ? 'c_cpp' : props.value?.value}
                theme='dawn'
                onChange={(c) =>
                    props.onChange?.({ code: c, value: props.value?.value, contentType: ContentType.Code })
                }
                name='ace'
                editorProps={{ $blockScrolling: true }}
                placeholder='Start by typing code here...'
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                maxLines={200}
                highlightActiveLine={true}
                value={props.value?.code}
                fontSize='1.2rem'
                width='100%'
                style={{ maxHeight: '30vh' }}
                setOptions={{ minLines: 49, newLineMode: true }}
            />
            <FormControl sx={{ position: 'absolute', right: 24, top: 24 }}>
                <InputLabel>Language</InputLabel>
                <Select
                    value={props.value?.value}
                    label='Language'
                    onChange={(e) =>
                        props.onChange?.({
                            code: props.value?.code,
                            value: e.target.value,
                            contentType: ContentType.Code,
                        })
                    }
                    size='small'
                >
                    {Object.keys(languages).map((l, i) => (
                        <MenuItem value={l} key={i}>
                            {Object.values(languages)[i]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ContentCodeEditor;
