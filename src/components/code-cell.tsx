import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Bundle from '../bundler';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await Bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue={''} onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
