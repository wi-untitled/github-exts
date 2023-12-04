import { observer, useLocalStore } from "mobx-react";
import { NotificationsRequstedChangesStore } from "./NotificationsRequstedChangesStore";
import { useService, useStore } from "src/hooks";
import { NoResult, RequestedChangesPullRequest } from "./components";
import { makeGithubPullRequestUrl } from "src/utils";

export function NotificationsRequstedChanges() {
    const appStore = useStore("AppStore");
    const notificationsService = useService("NotificationsService");
    const notificationsStore = useLocalStore(
        () =>
            new NotificationsRequstedChangesStore(
                appStore,
                notificationsService,
            ),
    );

    return (
        <div className="my-2">
            <div>Requested Changes for last week</div>
            <div className="h-px w-full bg-gray-400 my-2" />
            <div className="max-h-32 overflow-y-scroll no-scrollbar">
                {notificationsStore.isLoading && <div>loading</div>}
                {notificationsStore.isEmpty && !notificationsStore.isLoading ? (
                    <NoResult />
                ) : (
                    !notificationsStore.isLoading &&
                    notificationsStore.notifications.map(
                        ({ created_at, title, pull_request: { html_url } }) => {
                            return (
                                <RequestedChangesPullRequest
                                    created_at={created_at}
                                    html_url={html_url}
                                    title={title}
                                    full_name={makeGithubPullRequestUrl(
                                        html_url,
                                    )}
                                />
                            );
                        },
                    )
                )}
            </div>
        </div>
    );
}

export const NotificationsRequstedChangesModule = observer(
    NotificationsRequstedChanges,
);
