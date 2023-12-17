export const NotificationsApprovedTop10Query = `
    query NotificationsApprovedTop10($login: String!) {
        user(login: $login) {
            pullRequests(last: 10, states: OPEN) {
                totalCount
                nodes {
                    createdAt
                    number
                    title
                    state
                    url
                    reviewDecision
                    reviewRequests(first: 1) {
                        nodes {
                            requestedReviewer {
                                ... on User {
                                    login
                                }
                            }
                        }
                    }
                    reviews(first: 1, states: [PENDING, APPROVED]) {
                        nodes {
                            state
                            createdAt
                            author {
                                login
                            }
                        }
                    }
                }
            }
        }
    }
`;
