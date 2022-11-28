import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCharacters } from '../redux/characterSlice';
import CharacterCard from './reusable/CharacterCard';

const CharacterSearch = () => {
  const dispatch = useDispatch()
  const [characterResult, setCharacterResult] = useState({})
  const [searchInput, setSearchInput] = useState('')
  const getCharacters = async () => {
    const response = await fetch(`https://api.got.show/api/book/characters/${searchInput}`)
    const jsonResponse = await response.json()
    setSearchInput('')
    setCharacterResult(jsonResponse)
    dispatch(searchCharacters(jsonResponse))
  }
  const submitQuery = (e) => {
    e.preventDefault()
    getCharacters()
  }
  return (
    <div>
      <form onSubmit={submitQuery}>
        <input 
          type='text' 
          placeholder='Character Name' 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <button type='submit'>Search</button>
      </form>
      { !!characterResult?.name && 
        <CharacterCard character={characterResult} />
      }
    </div>
  );
}

export default CharacterSearch;
