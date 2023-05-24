import { useCallback, useState } from 'react';
import AceEditor from 'react-ace';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/ext-language_tools';

type CodeEditorProps = {
    default: string;
    onChange: (code: string, language: string) => void;
};

const languages = {
    javascript: 'JavaScript',
    markdown: 'Markdown',
    java: 'Java',
    php: 'PHP',
    csharp: 'C#',
    //c: 'C',
    //cpp: 'C++',
    sql: 'SQL',
    python: 'Python',
};

const CodeEditor = (props: CodeEditorProps) => {
    const [code, setCode] = useState(props.default);
    const [lang, setLang] = useState(Object.keys(languages)[0]);
    const onChange = useCallback(
        (code: string, language: string) => {
            setCode(code);
            setLang(language);
            props.onChange(code, language);
        },
        [props]
    );
    return (
        <div style={{ position: 'relative', margin:'1em' }}>
            <AceEditor
                mode={lang}
                theme='dawn'
                onChange={(c) => onChange(c, lang)}
                name='ace'
                editorProps={{ $blockScrolling: true }}
                placeholder='Start by typing code here...'
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                maxLines={200}
                highlightActiveLine={true}
                value={code}
                fontSize='1rem'
                width='100%'
                setOptions={{minLines:40}}
            />
            <FormControl sx={{ position: 'absolute', right: 8, bottom: 8 }}>
                <InputLabel>Language</InputLabel>
                <Select value={lang} label='Language' onChange={(e) => onChange(code, e.target.value)} size='small'>
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

export default CodeEditor;
