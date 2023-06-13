import 'ace-builds/src-noconflict/ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-idle_fingers';
import 'ace-builds/src-noconflict/ext-language_tools';

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCallback, useState } from 'react';
import AceEditor from 'react-ace';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../api/hooks';

type CodeEditorProps = {
    default: string;
    onSubmit: (code: string, language: string) => void;
};

const languages = {
    cpp: 'C++',
    csharp: 'C#',
    java: 'Java',
    javascript: 'JavaScript',
    php: 'PHP',
    python: 'Python',
};

const CodeEditor = (props: CodeEditorProps) => {
    const [code, setCode] = useState(props.default);
    const [params, setParams] = useSearchParams();
    const lang = params.get('language');
    const onChange = useCallback(
        (code: string, language: string) => {
            setCode(code);
            if ((!lang && language !== 'python') || lang !== language) {
                params.set('language', language);
                setParams(params);
            }
        },
        [lang, params, setParams]
    );
    const theme = useAppSelector((store) => store.appSlice.theme);

    return (
        <div style={{ position: 'relative', padding: '1em', height: '100%' }}>
            <AceEditor
                mode={lang === 'cpp' ? 'c_cpp' : lang ?? 'python'}
                theme={theme === 'dark' ? 'idle_fingers' : 'dawn'}
                onChange={(c) => onChange(c, lang ?? 'python')}
                name='ace'
                editorProps={{ $blockScrolling: true }}
                placeholder='Start by typing code here...'
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                maxLines={200}
                highlightActiveLine={true}
                value={code}
                fontSize='1.2rem'
                width='100%'
                style={{ maxHeight: 'calc(95vh - 64px)' }}
                setOptions={{ minLines: 49, newLineMode: true }}
            />
            <FormControl sx={{ position: 'absolute', right: 24, top: 24 }}>
                <InputLabel>Language</InputLabel>
                <Select
                    value={lang ?? 'python'}
                    label='Language'
                    onChange={(e) => onChange(code, e.target.value)}
                    size='small'
                >
                    {Object.keys(languages).map((l, i) => (
                        <MenuItem value={l} key={i}>
                            {Object.values(languages)[i]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                size='large'
                variant='contained'
                sx={{ width: '16em', position: 'absolute', bottom: '2em', left: 'calc(50% - 8em)' }}
                onClick={() => props.onSubmit(code, lang ?? 'python')}
                disabled={code.trim().length === 0}
            >
                Check
            </Button>
        </div>
    );
};

export default CodeEditor;
