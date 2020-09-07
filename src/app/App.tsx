import React, { lazy, Suspense } from 'react'
import './App.css'
import { RepoSearchForm } from 'features/repoSearch/RepoSearchForm'
import { IssuesListPage } from 'features/issuesList/IssuesListPage'
import { useSelectedIssueId } from 'state'

const IssueDetailsPage = lazy(
  () => import('features/issueDetails/IssueDetailsPage')
)

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
    <Suspense fallback={null}>
      <IssueDetailsPage />
    </Suspense>
  </div>
)

export default App
