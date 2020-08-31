import React from 'react'
import './App.css'
import { RepoSearchForm } from 'features/repoSearch/RepoSearchForm'
import { IssuesListPage } from 'features/issuesList/IssuesListPage'
import { IssueDetailsPage } from 'features/issueDetails/IssueDetailsPage'
import { useSelectedIssueId } from 'state'

const List: React.FC = () =>
  useSelectedIssueId() === null ? (
    <>
      <RepoSearchForm />
      <IssuesListPage />
    </>
  ) : null

const App: React.FC = () => (
  <div className="App">
    <List />
    <IssueDetailsPage />
  </div>
)

export default App
