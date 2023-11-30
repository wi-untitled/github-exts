export const urls = {
    user: {
        /**
         * Return information about authorized user
         */
        url: `https://api.github.com/user`,
    },
    notifications: {
        /**
         * Return notifications for authorized user
         */
        url: "https://api.github.com/notifications",
    },
    followers: {
        /**
         * Return followers for authorized user
         */
        url: "https://api.github.com/user/followers",
    },
    following: {
        /**
         * Return following for authorized user
         */
        url: "https://api.github.com/user/following",
    },
};
