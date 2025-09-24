"use client";

import "./index.css";
import { APITester } from "./APITester";
import { Card, CardContent } from "@/components/ui/card";
import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { CodeBlock } from "@/components/codeblock/codeblock";

export function App() {

  const codeString = "import { useState } from 'react';";

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6 flex flex-col gap-4">

         <p>{"syntax-highlight-element"}</p>

          <syntax-highlight language="js">
            { codeString }
          </syntax-highlight>

          <p>{"react-syntax-highlighter"}</p>

          <CodeBlock />

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
