import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    // State for the input of the form
    const [newRepo, setNewRepo] = useState('');
    // State to store errors that may happen on the input
    const [inputError, setInputError] = useState('');

    // State for the repositories - array of repos
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        // Access local storage
        const storagedRepositorires = localStorage.getItem(
            '@GithubExplorer:repositories',
        );

        // If the storage has content, return it so we can initialize the app with the repositories state contining those repos
        if (storagedRepositorires) {
            return JSON.parse(storagedRepositorires);
        }
        // There is no content inside the local storage, return empty array - state initializes as empty array
        return [];
    });

    // Every time there is a change on the repository, save it on local storage
    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    // FormEvent = represents the events bound to the form
    // HTMLFormElement = represents the actual html form
    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        // If the input is empty
        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        try {
            // Define type of the response we get from the api, as a Repository
            const response = await api.get<Repository>(`repos/${newRepo}`);
            const repository = response.data;

            setRepositories([...repositories, repository]);
            // Clear input
            setNewRepo('');
            // Remove error
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {/* Only render Error if the condition is true - there is an error */}
            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link
                        key={repository.full_name}
                        to={`/repository/${repository.full_name}`}
                    >
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
