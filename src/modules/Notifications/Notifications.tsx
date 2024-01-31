import { observer, useLocalStore } from "mobx-react";
import { NotificationsStore } from "./NotificationsStore";
import { useService, useStore } from "src/hooks";
import { PullRequest } from "./components";
import { makeGithubPullRequestUrl } from "src/utils";
import { Widget, NoResult } from "src/components";
import { useTranslation } from "react-i18next";

export function Notifications() {
    const appStore = useStore("AppStore");
    const notificationsService = useService("NotificationsService");
    const notificationsStore = useLocalStore(
        () => new NotificationsStore(appStore, notificationsService),
    );
    const { t } = useTranslation();

    return (
        <Widget
            title={t("notifications.title")}
            isLoading={notificationsStore.isLoading}
        >
            <div className="max-h-32 overflow-y-scroll no-scrollbar">
                {notificationsStore.isEmpty ? (
                    <NoResult message={t("notifications.empty")} />
                ) : (
                    notificationsStore.notifications.map(
                        ({ created_at, title, pull_request: { html_url } }) => {
                            return (
                                <PullRequest
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

export const NotificationsModule = observer(Notifications);
