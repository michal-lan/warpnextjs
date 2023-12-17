export const flatListToHierarchical = (data?: object[]): object[] => {
    const idKey: string = 'id'
    const parentKey: string = 'parentId'
    const childrenKey: string = 'children'

    const tree: object[] = []
    if (Array.isArray(data)) {
        const childrenOf: any = []
        data.forEach((item: {}) => {
            const newItem: any = { ...item }
            const { [idKey]: id, [parentKey]: parentId = 0 }: any = newItem
            childrenOf[id] = childrenOf[id] || []
            newItem[childrenKey] = childrenOf[id]
            parentId
                ? (childrenOf[parentId] = childrenOf[parentId] || []).push(
                      newItem,
                  )
                : tree.push(newItem)
        })
    }
    return tree
}
