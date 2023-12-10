import { observer, useLocalStore } from "mobx-react";
import { NotificationsStore } from "./NotificationsStore";
import { useService, useStore } from "src/hooks";
import { NoResult, PullRequest } from "./components";
import { makeGithubPullRequestUrl } from "src/utils";
import { Widget } from "src/components/Widget/Widget";
import { useTranslation } from "react-i18next";

export function Notifications() {
    const appStore = useStore("AppStore");
    const notificationsService = useService("NotificationsService");
    const notificationsStore = useLocalStore(
        () => new NotificationsStore(appStore, notificationsService),
    );
    const { t } = useTranslation();

    return (
        <Widget title={t("notifications.title")} minHeight="93px">
            <div className="max-h-32 overflow-y-scroll no-scrollbar">
                {notificationsStore.isLoading && <div>loading</div>}
                {notificationsStore.isEmpty && !notificationsStore.isLoading ? (
                    <NoResult />
                ) : (
                    !notificationsStore.isLoading &&
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
