export function getIndex<T>(items: { id: number }[], id: T) {
    return items.findIndex(({ id: _id }: { id: number }) => {
        return id === _id;
    });
}
