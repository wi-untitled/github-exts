import { observer, useLocalStore } from "mobx-react";
import { NotificationsRequstedChangesStore } from "./NotificationsRequstedChangesStore";
import { useService, useStore } from "src/hooks";
import { NoResult, RequestedChangesPullRequest } from "./components";
import { makeGithubPullRequestUrl } from "src/utils";
import { Widget } from "src/components/Widget/Widget";

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
        <Widget title="Requested Changes for the last week" minHeight="93px">
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
        </Widget>
    );
}

export const NotificationsRequstedChangesModule = observer(
    NotificationsRequstedChanges,
);