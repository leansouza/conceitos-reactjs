import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(reponse => {
      setRepositories(reponse.data)
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Aplicativo React Feito em  - ${Date.now()}`,
      url : "leanderson.com.br",
      techs: ["Nodejs", "PHP", "Python"]
    })

    setRepositories([ ...repositories, response.data ])

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

  
    setRepositories(repositories.filter(
      reposit => reposit.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(reposit => (
        <li key={reposit.id}>
          {reposit.title}
            <button onClick={() => handleRemoveRepository(reposit.id)}>
              Remover
            </button>
        </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
