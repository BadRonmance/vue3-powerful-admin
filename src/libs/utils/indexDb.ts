/*
 * @Description: indexDB 基础功能封装
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-08-06 14:34:32
 * @LastEditTime: 2021-12-14 16:08:45
 * @LastEditors: 天生不是宠儿
 */

class browserIndexDB {
    config;
    _db: any; // 内部保存的 indexed 数据库 的实例
    request: any;
    objectStore: any;
    myIndexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB;
    constructor(options: any) {
        this.config = options;
        if (!this.myIndexedDB) {
            console.log("你的浏览器不支持IndexedDB");
        }
    }

    /**
     * @description: 设置初始数据
     * @version: 1.0.0
     * @author: 张泽锋
     * @Date: 2021-08-06 14:47:55
     */
    setup() {
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve, reject) => {
            const arrStore = [];
            // 遍历，获取表名集合，便于打开事务
            for (const key in this.config.objects) {
                arrStore.push(key);
            }
            const tranRequest = this._db.transaction(arrStore, "readwrite");

            // 遍历，添加数据（对象）
            for (const key in this.config.objects) {
                const objectArror = this.config.objects[key];
                const store = tranRequest.objectStore(key);
                // 清空数据
                store.clear().onsuccess = () => {
                    // 遍历添加数据
                    for (let i = 0; i < objectArror.length; i++) {
                        store.add(objectArror[i]).onsuccess = () => {
                            if (this.config.debug) {
                                console.log(`添加成功！key:${key}-i:${i}`);
                            }
                        };
                    }
                };
            }

            // 遍历后统一返回
            tranRequest.oncomplete = () => {
                // tranRequest.commit()
                if (this.config.debug) {
                    console.log("setup - oncomplete");
                }
                resolve(true);
            };
            tranRequest.onerror = (event: any) => {
                reject(event);
            };
        });
        return objectPromise;
    }
    /**
     * @description: 打开 indexedDB 数据库。
     * @version: 1.0.0
     * @param {dbName} 数据库名称；
     * @param {version} 数据库版本。
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-08-09 10:17:24
     */
    dbOpen = (dbName: undefined, version: undefined) => {
        // 创建数据库，并且打开
        const name = this.config.dbName || dbName;
        const ver = this.config.ver || version;
        const dbRequest = this.myIndexedDB.open(name, ver);
        // 记录数据库版本是否变更
        let isChange = false;
        /* 该域中的数据库myIndex */
        if (this.config.debug) {
            console.log("dbRequest - 打开indexedDb数据库：", dbRequest);
        }
        // 打开数据库的 promise
        const dbPromise = new Promise((resolve, reject) => {
            // 数据库打开成功的回调
            dbRequest.onsuccess = () => {
                // _db = event.target.result
                // 数据库成功打开后，记录数据库对象
                this._db = dbRequest.result;
                if (isChange) {
                    // 如果变更，则设置初始数据
                    this.setup().then(() => {
                        resolve(this._db);
                    });
                } else {
                    resolve(this._db);
                }
            };

            dbRequest.onerror = (event) => {
                reject(event); // 返回参数
            };
        });
        // 创建表
        // 第一次打开成功后或者版本有变化自动执行以下事件，一般用于初始化数据库。
        dbRequest.onupgradeneeded = (event) => {
            isChange = true;
            this._db = event.target.result; /* 数据库对象 */
            // 建立对象表
            for (let i = 0; i < this.config.objectStores.length; i++) {
                const object = this.config.objectStores[i];
                // 验证有没有，没有的话建立一个对象表
                if (!this._db.objectStoreNames.contains(object.objectStoreName)) {
                    const objectStore = this._db.createObjectStore(
                        object.objectStoreName,
                        {
                            keyPath: "id",
                        }
                    ); /* 创建person仓库(表) 主键 */
                    // objectStore = _db.createObjectStore('person',{autoIncrement:true});/*自动创建主键*/
                    // 建立索引
                    for (let i = 0; i < object.index.length; i++) {
                        const index = object.index[i];
                        objectStore.createIndex(index.name, index.name, {
                            unique: index.unique,
                        });
                    }
                    if (this.config.debug) {
                        console.log(
                            "onupgradeneeded - 建立了一个新的对象仓库：",
                            objectStore
                        );
                    }
                }
            }
        };

        // 返回 Promise 实例 —— 打开Indexed库
        return dbPromise;
    };
    /**
     * @description:表中添加数据
     * @version: 1.0.0
     * @param {*} storeName 对象仓库名
     * @param {*} object 要添加的对象
     * @author: 张泽锋
     * @Date: 2021-08-06 14:49:38
     */
    addObject(storeName: any, object: any) {
        const _object = object;
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve, reject) => {
            // 定义个函数，便于调用
            const _addObject = () => {
                const tranRequest = this._db.transaction(storeName, "readwrite");
                tranRequest
                    .objectStore(storeName) // 获取store
                    .add(_object).onsuccess = (event: { target: { result: unknown; }; }) => {
                        // 添加对象
                        // 成功后的回调
                        resolve(event.target.result); // 返回对象的ID
                    };
                tranRequest.onerror = (event: any) => {
                    reject(event);
                };
            };

            // 判断数据库是否打开
            if (typeof this._db === "undefined") {
                this.dbOpen().then(() => {
                    _addObject();
                });
            } else {
                _addObject();
            }
        });
        return objectPromise;
    }
    /**
     * @description: 修改对象
     * @version: 1.0.0
     * @param {*} storeName 对象仓库名
     * @param {*} object 要修改的对象
     * @author: 张泽锋
     * @Date: 2021-08-06 15:02:08
     */
    updateObject(storeName: any, object: any) {
        const _object = object;
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve, reject) => {
            // 定义个函数，便于调用
            const _updateObject = () => {
                const tranRequest = this._db.transaction(storeName, "readwrite");
                // 按照id获取对象
                tranRequest
                    .objectStore(storeName) // 获取store
                    .get(_object.id).onsuccess = (event: { target: { result: any; }; }) => {
                        // 获取对象
                        // 成功后的回调
                        // 从仓库里提取对象，把修改值合并到对象里面。
                        const newObject = { ...event.target.result, ..._object };
                        // 修改数据
                        tranRequest
                            .objectStore(storeName) // 获取store
                            .put(newObject).onsuccess = (event: { target: { result: unknown; }; }) => {
                                // 修改对象
                                // 成功后的回调
                                if (this.config.debug) {
                                    console.log("updateObject -- onsuccess- event:", event);
                                }
                                resolve(event.target.result);
                            };
                    };

                tranRequest.onerror = (event: any) => {
                    reject(event);
                };
            };
            // 判断数据库是否打开
            if (typeof this._db === "undefined") {
                this.dbOpen().then(() => {
                    _updateObject();
                });
            } else {
                _updateObject();
            }
        });
        return objectPromise;
    }
    /**
     * @description: 依据id删除对象
     * @version: 1.0.0
     * @param {*} storeName 对象仓库名
     * @param {*} id 要删除的对象的key值，注意类型要准确。
     * @author: 张泽锋
     * @Date: 2021-08-09 11:43:18
     */
    deleteObject = (storeName: any, id: any) => {
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve, reject) => {
            // 定义个函数，便于调用
            const _deleteObject = () => {
                const tranRequest = this._db.transaction([storeName], "readwrite");
                tranRequest
                    .objectStore(storeName) // 获取store
                    .delete(id).onsuccess = (event: { target: { result: unknown; }; }) => {
                        // 删除一个对象
                        // 成功后的回调
                        resolve(event.target.result);
                    };
                tranRequest.onerror = (event: any) => {
                    reject(event);
                };
            };
            // 判断数据库是否打开
            if (typeof this._db === "undefined") {
                this.dbOpen().then(() => {
                    _deleteObject();
                });
            } else {
                _deleteObject();
            }
        });
        return objectPromise;
    };
    /**
     * @description: 清空store里的所有对象
     * @version: 1.0.0
     * @param {*} storeName 对象仓库名
     * @author: 张泽锋
     * @Date: 2021-08-09 11:43:18
     */
    clearStore = (storeName: any) => {
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve, reject) => {
            // 定义个函数，便于调用
            const _clearStore = () => {
                const tranRequest = this._db.transaction(storeName, "readwrite");
                tranRequest
                    .objectStore(storeName) // 获取store
                    .clear().onsuccess = (event: unknown) => {
                        // 清空对象仓库里的对象
                        // 成功后的回调
                        resolve(event);
                    };
                tranRequest.onerror = (event: any) => {
                    reject(event);
                };
            };
            // 判断数据库是否打开
            if (typeof this._db === "undefined") {
                this.dbOpen().then(() => {
                    _clearStore();
                });
            } else {
                _clearStore();
            }
        });
        return objectPromise;
    };
    /**
     * @description: 删除整个store
     * @version: 1.0.0
     * @param {*} storeName 对象仓库名
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-08-09 14:42:06
     */
    deleteStore = (storeName: any) => {
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve, reject) => {
            // 定义个函数，便于调用
            const _deleteStore = () => {
                const tranRequest = this._db.transaction(storeName, "readwrite");
                tranRequest
                    .objectStore(storeName) // 获取store
                    .delete().onsuccess = (event: unknown) => {
                        // 清空对象仓库里的对象
                        // 成功后的回调
                        resolve(event);
                    };
                tranRequest.onerror = (event: any) => {
                    reject(event); // 失败后的回调
                };
            };
            // 判断数据库是否打开
            if (typeof this._db === "undefined") {
                this.dbOpen().then(() => {
                    _deleteStore();
                });
            } else {
                _deleteStore();
            }
        });
        return objectPromise;
    };
    /**
     * @description: 删除数据库
     * @version: 1.0.0
     * @param {*} dbName 数据库名
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-08-09 14:42:39
     */
    deleteDB = (dbName: string) => {
        // 定义一个 Promise 的实例
        const objectPromise = new Promise((resolve) => {
            // 删掉整个数据库
            this.myIndexedDB.deleteDatabase(dbName).onsuccess = (event) => {
                resolve(event);
            };
        });
        return objectPromise;
    };
    /**
     * @description: 按主键获取对象 未规定主键的情况下返回全部
     * @version: 1.0.0
     * @param {*} storeName 对象仓库名
     * @param {*} id 要获取的对象的key值，注意类型要准确，只能取一个。
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-08-09 14:45:58
     */
    getObject = (storeName: any, id: any) => {
        const objectPromise = new Promise((resolve, reject) => {
            const _getObject = () => {
                const tranRequest = this._db.transaction(storeName, "readonly");
                const store = tranRequest.objectStore(storeName); // 获取store
                let dbRequest = id ? store.get(id) : store.getAll();
                // // 判断是获取一个，还是获取全部
                // if (typeof id === "undefined") {
                //   dbRequest = store.getAll();
                // } else {
                //   dbRequest = store.get(id);
                // }

                dbRequest.onsuccess = (event: { target: { result: unknown; }; }) => {
                    // 成功后的回调
                    if (this.config.debug) {
                        console.log("getObject -- onsuccess- event:", id, event);
                    }
                    resolve(event.target.result); // 返回对象
                };

                tranRequest.onerror = (event: any) => {
                    reject(event);
                };
            };
            // 判断数据库是否打开
            if (typeof this._db === "undefined") {
                this.dbOpen().then(() => {
                    _getObject();
                });
            } else {
                _getObject();
            }
        });

        return objectPromise;
    };
}
export default browserIndexDB;
