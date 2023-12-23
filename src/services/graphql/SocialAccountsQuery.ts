export const SocialAccountsQuery = `
  query {
   user(login: "vladislavkovaliov") {
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
