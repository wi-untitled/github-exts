import {
    action,
    computed,
    makeAutoObservable,
    observable,
    override,
} from "mobx";
import { BaseStore } from "src/stores/BaseStore";
import { IWidget } from "src/types";
import { WidgetsId } from "src/enums";
import { STORAGE_KEYS } from "src/constants";

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
];

export class SettingsStore extends BaseStore {
    private initWidgets: IWidget[];
    public widgets: IWidget[];
    public constructor() {
        super();

        makeAutoObservable<SettingsStore, "updateLoading" | "updateWidgets">(
            this,
            {
                widgets: observable,
                updateWidgetById: action,
                updateWidgets: action,
                isLoading: override,
                updateLoading: override,
                needSave: computed,
            },
        );

        this.widgets = definedWidgets;

        // TODO: removes when local storage sync is implemented
        this.isLoading = false;

        if (this.checkSettingsInLocalStorage()) {
            this.syncSettingsWithLocalStorage();
        }

        this.initWidgets = this.widgets;
    }

    private checkSettingsInLocalStorage = (): boolean => {
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
    private syncSettingsWithLocalStorage = (): void => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);

            if (!data) {
                return;
            }

            const { widgets } = JSON.parse(data);

            this.updateWidgets(widgets);
        } catch (error) {
            console.trace(error);
        }
    };

    private writeSettingsInLocalStorage = (): void => {
        try {
            localStorage.setItem(
                STORAGE_KEYS.SETTINGS,
                JSON.stringify({
                    widgets: this.widgets,
                }),
            );

            this.initWidgets = this.widgets;
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

    private updateWidgets = (newWidgets: IWidget[]): void => {
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
        } catch (error) {
            console.trace(error);
        }
    };

    public get needSave(): boolean {
        const mapWidgets = this.initWidgets.reduce((acc, widget) => {
            acc[widget.id] = widget.enabled;

            return acc;
        }, {}); // O(n)

        const hasDiff = this.widgets.some(({ id, enabled }) => {
            return enabled !== mapWidgets[id];
        }); // O(n)

        return hasDiff; // O(n + n)
    }
}
