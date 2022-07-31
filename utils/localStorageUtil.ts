/*
 * @Author: cos
 * @Date: 2022-05-04 19:44:09
 * @LastEditTime: 2022-06-19 00:12:00
 * @LastEditors: cos
 * @Description: localStorage工具
 * @FilePath: \byte-search\src\utils\localStorageUtil.ts
 */
const STORAGE_KEY = '__cosine_toolbox_data'; //当前网页数据
if (!window.localStorage) {
  alert('浏览器不支持localstorage');
}
export default {
  getStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  },
  setItem(key: string, value: any, module_name?: string): void {
    if (module_name) {
      const val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
    } else {
      const val = this.getStorage();
      val[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  getItem(key: string, module_name?: string): any {
    if (module_name) {
      const val = this.getItem(module_name);
      if (val) {
        return val[key];
      }
    }
    return this.getStorage()[key];
  },
  clear(key: string, module_name?: string) {
    const val = this.getStorage();
    if (module_name) {
      delete val[module_name][key];
    } else delete val[key];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
};
