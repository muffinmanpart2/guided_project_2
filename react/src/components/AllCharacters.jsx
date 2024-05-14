import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export const AllCharacters = () =>  {
    const [characters, setCharacters] = useState([])
    useEffect (() => {
        fetch('localhost:3000')
        .then(res => res.json())
        .then(characters => setCharacters(characters))
    }, [])

    return (
        <>
            <h2>Characters</h2>
            <section id="characters">
                {characters.map(character => 
                <Link 
                    to={'/characters/${character.id}'}>
                    <button key={character.id}>{character.name}</button>
                </Link>
                )}
            </section>
        </>
     )
}

export default AllCharacters;