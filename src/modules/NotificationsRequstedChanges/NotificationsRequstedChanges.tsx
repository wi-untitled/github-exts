import { observer, useLocalStore } from "mobx-react";
import { NotificationsRequstedChangesStore } from "./NotificationsRequstedChangesStore";
import { useService, useStore } from "src/hooks";
import { RequestedChangesPullRequest } from "./components";
import { Url } from "src/utils";
import { Widget, NoResult } from "src/components";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
        <Widget
            isLoading={notificationsStore.isLoading}
            title={t("notificationsRequestedChanges.title")}
        >
            <div className="max-h-32 overflow-y-scroll no-scrollbar">
                {notificationsStore.isEmpty ? (
                    <NoResult
                        message={t("notificationsRequestedChanges.empty")}
                    />
                ) : (
                    notificationsStore.notifications.map(
                        ({ created_at, title, pull_request: { html_url } }) => {
                            return (
                                <RequestedChangesPullRequest
                                    created_at={created_at}
                                    html_url={html_url}
                                    title={title}
                                    full_name={Url.makeGithubPullRequestUrl(
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
