export const UserFollowingQuery = `
  query UserFollowingQuery($login: String!, $first: Int, $after: String) {
    user(login: $login) {
        login
        following(first: $first, after: $after) {
            totalCount
            nodes {
                login
                url
                avatarUrl
            }
            pageInfo {
                    endCursor
                hasNextPage
           }
        }  
    }
}
`;
