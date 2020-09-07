import {
  startWith,
  withLatestFrom,
  filter,
  switchMap,
  retryWhen,
  skip,
} from 'rxjs/operators'
import { bind, SUSPENSE } from '@react-rxjs/core'
import { Issue, getIssue, getComments } from 'api/githubAPI'
import { issueSelected$, selectedIssueId$, currentRepo$ } from 'state'

export const onIssueUnselecteed = () => {
  issueSelected$.next(null)
}

export const [useIssue, issue$] = bind(
  selectedIssueId$.pipe(
    filter((id): id is number => id !== null),
    withLatestFrom(currentRepo$),
    switchMap(([id, { org, repo }]) =>
      getIssue(org, repo, id).pipe(startWith(SUSPENSE))
    )
  )
)

export const [useIssueComments, issueComments$] = bind(
  issue$.pipe(
    filter((issue): issue is Issue => issue !== SUSPENSE),
    switchMap((issue) =>
      getComments(issue.comments_url).pipe(startWith(SUSPENSE))
    )
  )
)

issueComments$.pipe(retryWhen(() => selectedIssueId$.pipe(skip(1)))).subscribe()
