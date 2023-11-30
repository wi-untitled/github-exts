import { observer, useLocalStore } from "mobx-react";
import { NotificationsStore } from "./NotificationsStore";
import { useService, useStore } from "src/hooks";
import { NoResult, PullRequest } from "./components";

export function Notifications() {
    const appStore = useStore("AppStore");
    const notificationsService = useService("NotificationsService");
    const notificationsStore = useLocalStore(
        () => new NotificationsStore(appStore, notificationsService),
    );

    return (
        <div className="my-2">
            <div>Requested Pull Request for last week</div>
            <div className="h-px w-full bg-gray-400 my-2" />
            <div className="max-h-32 overflow-y-scroll no-scrollbar">
                {notificationsStore.isEmpty ? (
                    <NoResult />
                ) : (
                    notificationsStore.reviewRequestedNotifications.map(
                        ({
                            updated_at,
                            subject: { url, title },
                            repository: { full_name },
                        }) => {
                            return (
                                <PullRequest
                                    updated_at={updated_at}
                                    url={url}
                                    title={title}
                                    full_name={full_name}
                                />
                            );
                        },
                    )
                )}
            </div>
        </div>
    );
}

export const NotificationsModule = observer(Notifications);
