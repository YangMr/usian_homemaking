/**
 * @author YangLing
 * @date 2021/12/30 2:59 PM
 */
import Http from "../utils/http";

class Category{
    /**
     * 获取分类列表接口
     * @returns {Promise<*|undefined>}
     */
    static getCategoryList(){
        return Http.request({url : "/v1/category" , method : "GET"})
    }
    // static
    static async getCategoryListWithAll(){
        const categoryList = await Category.getCategoryList()
        categoryList.unshift({"id" : 0, "name" : "全部"})
        return categoryList
    }
}

export default Category