"use client";

import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export const CodeBlock = () => {
  const codeString = "import { useState } from 'react';";
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  );
};