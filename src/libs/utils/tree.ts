/**
 * @description: 平级结构转化为树形结构
 * @Version: 1.0.0
 * @param {Array} data 数据源
 * @param {String} superiorId 父级id
 * @param {String} permissionId 子级id
 * @return {Array} 返回树形结构
 * @author: 张泽锋
 * @Date: 2020-08-11 20:11:52
 */
export const listToTree = (data: object[], superiorId: string | number, permissionId: string | number) => {
    let arr = JSON.parse(JSON.stringify(data));
    const listChildren = (obj: any, filter: any) => {
            [arr, obj.children] = arr.reduce(
                (res: any, val: any) => {
                    if (filter(val)) {
                        res[1].push(val);
                    } else {
                        res[0].push(val);
                    }
                    return res;
                },
                [[], []]
            );
            obj.children.forEach((val: any) => {
                if (arr.length) {
                    listChildren(val, (obj: any) => obj[superiorId] === val[permissionId]);
                }
            });
        },
        tree: any = {};

    listChildren(
        tree,
        (val: any) => arr.findIndex((i: any) => i[permissionId] === val[superiorId]) === -1
    );
    return tree.children;
};

/**
 * @description: 树形结构转化为平级结构
 * @Version: 1.0.0
 * @param {Array} 需要转化的树形结构
 * @return {Array} 返回平级的结构
 * @author: 张泽锋
 * @Date: 2020-08-11 20:11:08
 */
export const treeToList = (list: object[], key = 'children', id = 'id') => {
    let output: any = [];
    const listData = (list: object[], superiorId = '') => {
        list.forEach(function (item: any) {
            if (item[key] && item[key].length > 0) {
                listData(item[key], item[id]);
                delete item[key];
            }
            if (superiorId !== '') {
                item.parentId = superiorId;
            }
            output.push(item);
        });
    };

    listData(list);
    return output;
};
