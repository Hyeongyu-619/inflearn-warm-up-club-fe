// App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface UserProfile {
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Repository {
  name: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
}

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          setProfile(null);
        });

      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
          setRepos(response.data);
        })
        .catch((error) => {
          setRepos([]);
        });
    }
  }, [username]);

  return (
    <div className="app-container">
      <h1>GitHub Finder</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {profile && (
        <div className="profile">
          <img src={profile.avatar_url} alt={profile.login} />
          <h2>{profile.name}</h2>
          <p>
            <strong>Company:</strong> {profile.company || "N/A"}
          </p>
          <p>
            <strong>Blog:</strong> <a href={profile.blog}>{profile.blog}</a>
          </p>
          <p>
            <strong>Location:</strong> {profile.location || "N/A"}
          </p>
          <p>
            <strong>Public Repos:</strong> {profile.public_repos}
          </p>
          <p>
            <strong>Followers:</strong> {profile.followers}
          </p>
          <p>
            <strong>Following:</strong> {profile.following}
          </p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repos">
          <h2>Latest Repos</h2>
          {repos.map((repo) => (
            <div className="repo" key={repo.name}>
              <a
                href={`https://github.com/${username}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
              <span>Stars: {repo.stargazers_count}</span>
              <span>Watchers: {repo.watchers_count}</span>
              <span>Forks: {repo.forks_count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
