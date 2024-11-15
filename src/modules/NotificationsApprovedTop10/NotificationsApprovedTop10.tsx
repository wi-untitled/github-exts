import { observer, useLocalStore } from "mobx-react";
import { NotificationsApprovedTop10Store } from "./NotificationsApprovedTop10Store";
import { useService, useStore } from "src/hooks";
import { PullRequest } from "./components";
import { Url } from "src/utils";
import { Widget, NoResult } from "src/components";
import { useTranslation } from "react-i18next";

export function NotificationsApprovedTop10() {
    const appStore = useStore("AppStore");
    const notificationsService = useService("NotificationsService");
    const notificationsApprovedTop10Store = useLocalStore(
        () =>
            new NotificationsApprovedTop10Store(appStore, notificationsService),
    );

    const { t } = useTranslation();

    return (
        <Widget
            title={t("notificationsApprovedTop10.title")}
            isLoading={notificationsApprovedTop10Store.isLoading}
        >
            <div className="max-h-32 overflow-y-scroll no-scrollbar">
                {notificationsApprovedTop10Store.isEmpty ? (
                    <NoResult message={t("notificationsApprovedTop10.empty")} />
                ) : (
                    !notificationsApprovedTop10Store.isLoading &&
                    notificationsApprovedTop10Store.notifications.map(
                        ({ created_at, title, pull_request: { html_url } }) => {
                            return (
                                <PullRequest
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

export const NotificationsApprovedTop10Module = observer(
    NotificationsApprovedTop10,
);
