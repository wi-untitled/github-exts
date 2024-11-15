import { action, computed, makeObservable, observable } from "mobx";
import { BaseStore } from "src/stores/BaseStore";
import { IWidget } from "src/types";
import { WidgetsId } from "src/enums";
import { STORAGE_KEYS } from "src/constants";
import { Transport } from "src/transport";
import { NotificationsService } from "src/services";

export const definedWidgets: IWidget[] = [
    {
        id: WidgetsId.UserFollowers,
        enabled: true,
    },
    {
        id: WidgetsId.UserFollowings,
        enabled: true,
    },
    {
        id: WidgetsId.TopLanguages,
        enabled: true,
    },
    {
        id: WidgetsId.Notifications,
        enabled: true,
    },
    {
        id: WidgetsId.NotificationsRequestedChanges,
        enabled: true,
    },
    {
        id: WidgetsId.NotificationsApprovedTop10,
        enabled: true,
    },
    {
        id: WidgetsId.Stats,
        enabled: true,
    },
];

export const DEFAULT_AUTOUPDATE_ENABLED = false;
export const DEFAULT_SETTINGS_TILE_ENABLED = false;

export const DEFAULT_PREDICTABLE = [
    WidgetsId.TopLanguages,
    WidgetsId.Stats,
    WidgetsId.Notifications,
    WidgetsId.SocialAccount,
    WidgetsId.UserFollowers,
    WidgetsId.UserFollowings,
    WidgetsId.NotificationsApprovedTop10,
    WidgetsId.NotificationsRequestedChanges,
];

export class SettingsStore extends BaseStore {
    protected initWidgets: IWidget[];
    public widgets: IWidget[];
    protected initIsAutoUpdateEnabled: boolean;
    public isAutoUpdateEnabled: boolean;
    public predictable: WidgetsId[];

    public constructor(
        transport: Transport,
        notificationsService: NotificationsService,
    ) {
        super(transport, notificationsService);

        makeObservable<
            SettingsStore,
            "updateWidgets" | "writeSettingsInLocalStorage"
        >(this, {
            isAutoUpdateEnabled: observable,
            widgets: observable,
            predictable: observable,
            updateWidgetById: action,
            updateWidgets: action,
            updateAutoUpdateEnabled: action,
            writeSettingsInLocalStorage: action,
            updatePredictable: action,
            needSave: computed,
        });

        this.widgets = definedWidgets;
        this.isAutoUpdateEnabled = DEFAULT_AUTOUPDATE_ENABLED;
        this.predictable = DEFAULT_PREDICTABLE;

        // TODO: removes when local storage sync is implemented
        this.isLoading = false;

        if (this.checkSettingsInLocalStorage()) {
            this.syncSettingsWithLocalStorage();
        }

        this.initWidgets = this.widgets;
        this.initIsAutoUpdateEnabled = this.isAutoUpdateEnabled;
    }

    protected checkSettingsInLocalStorage = (): boolean => {
        try {
            const hasData = localStorage.getItem(STORAGE_KEYS.SETTINGS);

            return Boolean(hasData);
        } catch (error) {
            console.trace(error);

            return false;
        }
    };

    /**
     * Sync with local storage when user reload page
     * need load them from there.
     */
    protected syncSettingsWithLocalStorage = (): void => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);

            if (!data) {
                return;
            }

            const { widgets, isAutoUpdateEnabled, predictable } =
                JSON.parse(data);

            this.updateWidgets(widgets);
            this.updateAutoUpdateEnabled(isAutoUpdateEnabled ?? false);
            this.updatePredictable(predictable ?? DEFAULT_PREDICTABLE);
        } catch (error) {
            console.trace(error);
        }
    };

    // TODO: makes dedicated fn to update by field name in LS
    protected writeSettingsInLocalStorage = (): void => {
        try {
            localStorage.setItem(
                STORAGE_KEYS.SETTINGS,
                JSON.stringify({
                    widgets: this.widgets,
                    isAutoUpdateEnabled: this.isAutoUpdateEnabled,
                    predictable: this.predictable,
                }),
            );

            // TODO: use observable.array
            this.initWidgets = this.widgets.map((x) => x);
            this.widgets = this.initWidgets.map((x) => x);

            this.initIsAutoUpdateEnabled = this.isAutoUpdateEnabled;
        } catch (error) {
            console.trace(error);
        }
    };

    public updateWidgetById = (data: Omit<IWidget, "title">): void => {
        const widget = this.widgets.find(({ id }) => id === data.id);

        if (!widget) {
            return;
        }

        const isEnabledChanged = widget.enabled !== data.enabled;

        if (!isEnabledChanged) {
            return;
        }

        this.widgets = this.widgets.map(({ id, enabled, ...rest }) => {
            return {
                id: id,
                enabled: id === data.id ? data.enabled : enabled,
                ...rest,
            };
        });
    };

    protected updateWidgets = (newWidgets: IWidget[]): void => {
        this.widgets = newWidgets;
    };

    // TODO: string in Record will be removed later
    public get visibleWidgets(): Record<WidgetsId | string, boolean> {
        return this.widgets.reduce(
            (acc, { id, enabled }) => {
                acc[id] = enabled;

                return acc;
            },
            {} as Record<WidgetsId | string, boolean>,
        );
    }

    public saveSettings = (): void => {
        try {
            this.writeSettingsInLocalStorage();
            // TODO: create fn for this
            this.transport.sendMessage<{
                isAutoUpdateEnabled: boolean;
            }>({
                action: "AutoUpdateChange",
                data: { isAutoUpdateEnabled: this.isAutoUpdateEnabled },
            });
        } catch (error) {
            console.trace(error);
        }
    };

    public updateAutoUpdateEnabled = (
        newIsAutoUpdateEnabled: boolean,
    ): void => {
        this.isAutoUpdateEnabled = newIsAutoUpdateEnabled;
    };

    public updatePredictable = (newPredictable: WidgetsId[]): void => {
        this.predictable = newPredictable;

        this.writeSettingsInLocalStorage();
    };

    public get needSave(): boolean {
        const mapWidgets = this.initWidgets.reduce(
            (acc, widget) => {
                acc[widget.id] = widget.enabled;

                return acc;
            },
            {} as Record<string, boolean>,
        ); // O(n)

        const hasDiff = this.widgets.some(({ id, enabled }) => {
            return enabled !== mapWidgets[id];
        }); // O(n)

        const hasAutoUpdateDiff =
            this.isAutoUpdateEnabled !== this.initIsAutoUpdateEnabled;

        return hasDiff || hasAutoUpdateDiff;
    }
}
