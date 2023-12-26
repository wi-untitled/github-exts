export const UserFollowerQuery = `
  query UserFollowerQuery($login: String!, $first: Int, $after: String) {
    user(login: $login) {
        login
        followers(first: $first, after: $after) {
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
