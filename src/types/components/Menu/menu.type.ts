export type MenuItemDataProps = {
    id: string
    label: string
    path: string
    children: MenuItemDataProps[]
    parentId: string
}

export type MenuProps = {
    items: MenuItemDataProps[]
    type: string
}
