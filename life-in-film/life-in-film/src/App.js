import logo from './logo.svg';
import './App.css';
import MainLayout from './components/mainLayout';
import ReadFile from './components/readFile';
import { useState } from 'react';

function App() {


  const [file, setFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [error, setError] = useState(null);
  
  const handleChange = (file) => {
    
    setFile(file);

    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
        setJsonFile(JSON.parse(evt.target.result));
    }
    reader.onerror = (evt) => {
        console.log('onerrror');
    }

  }

  const clearSelection  = (error = null) => {
    
    setError(error);
    setFile(null);
    setJsonFile(null);
  }

  return (
    jsonFile ?
      <MainLayout data={jsonFile} setFile={clearSelection}/> :
      <ReadFile handleChange={handleChange} error={error}/>


  );
}

export default App;
