import React, { useState } from 'react';
import { postUrls } from '../../apiCalls'

function UrlForm({ setUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

  const newUrl = {
    id: Date.now(),
    title: title,
    long_url: urlToShorten
  }
  postUrls(newUrl)
  .then(response => {
    setUrls((prevUrls) => [...prevUrls, response])
    clearInputs();
  })
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  const addNewUrl = (newUrl) => {

  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

<input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)} 
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
