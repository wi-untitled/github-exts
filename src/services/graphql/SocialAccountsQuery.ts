export const SocialAccountsQuery = `
  query SocialAccounts($login: String!) {
   user(login: $login) {
     socialAccounts(first: 100) {
        edges {
          node {
            __typename
            displayName
            provider
          }
        }
      }
    }
}
`;
