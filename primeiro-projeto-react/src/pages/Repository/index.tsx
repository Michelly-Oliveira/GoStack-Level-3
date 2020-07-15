import React, { useState, useEffect } from 'react';
// Get the params of the route
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    };
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    // Can't initialize a state that is an object as an empty object, becuase it doesn't have the props deifned at the interface. So we say it can be of type Repository or null(still not initialized)
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        api.get(`/repos/${params.repository}`).then(response =>
            setRepository(response.data),
        );

        api.get(`/repos/${params.repository}/issues`).then(response =>
            setIssues(response.data),
        );
    }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {/* Only render component if the repository is available */}
            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.owner.login}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>

                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issue => (
                    <a key={issue.id} href={issue.html_url} target="_blank">
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;
