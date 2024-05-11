import React, { useEffect } from 'react'
import {Editor} from '@monaco-editor/react'
import { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { CODE_SNIPPETS } from '../constant';
import Output from './Output';
export default function CodingEditor(props) {
  const {initialCode,onUpdateInitialCode,showOutput,problem} = props  
  const [language,setLanguage] = useState(`javascript`);
  const [value,setValue] = useState(``); 
  const onSelect = (language)=> {
    setLanguage(language)
    localStorage.setItem('currentLanguage', language);
  }


 

  useEffect(() => {
   
    console.log("initial code changed",language,initialCode)
    if(initialCode && initialCode.length > 0) { // If codes array is not present in localStorage
    // if(localStorage.getItem('codes') === null)localStorage.setItem('codes', JSON.stringify(initialCode));
    localStorage.setItem('codes', JSON.stringify(initialCode));
    const index = initialCode.findIndex(item => item.language === language);
    console.log("code and index",initialCode,index)
    setValue(initialCode[index].code);
    setLanguage(initialCode[index].language);

   // Store updated codes array in localStorage
    }
    return 
  
  }, [initialCode]);

  useEffect(() => {
    const storedCodes =  JSON.parse(localStorage.getItem('codes'));
    if (storedCodes !== null) {
      const storedCode = storedCodes.find((code) => code.language === language);
      if (storedCode) {
        setValue(storedCode.code);
        return;
      }
    }
    setValue(CODE_SNIPPETS[language] || CODE_SNIPPETS['javascript']);
    setLanguage(language || 'javascript');
  }, [language]);
  
  const handleCodeChange = (newValue) => {
    console.log("code changed")
    setValue(newValue);
    const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
    const updatedCodes = storedCodes.map((code) => {
      return code.language === language ? { ...code, code: newValue } : code;
    });
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
    onUpdateInitialCode(updatedCodes); // Store updated codes array in localStorage
  };
  
  const handleReset = () => {
    const defaultCode = CODE_SNIPPETS[language];
    setValue(defaultCode);
    // Update the stored code to the default code
    const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
    const updatedCodes = storedCodes.map((code) => {
      return code.language === language ? { ...code, code: defaultCode } : code;
    });
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
    onUpdateInitialCode(updatedCodes);
  };
 



 
  
  return (
    <div className="flex flex-col -row justify-center items-start space-y-4 ">
    <div className="w-full bg-gray-900 rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <LanguageSelector language={language} onSelect={onSelect} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleReset}>Reset</button>
      </div>
      <Editor
        height={'20vh'}
        theme='vs-dark'
        value={value}
        onChange={handleCodeChange}
        language={language}
      />
    </div>
    {showOutput && (
      <div className="w-full md:w-1/2 bg-transparent rounded-md p-4">
        <Output language={language} value={value} problem={problem} />
      </div>
    )}
  </div>
  
  );

}
