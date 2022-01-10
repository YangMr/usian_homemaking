/**
 * @author YangLing
 * @date 2022/1/10 9:22 AM
 */

const orderStatus = {
    //待同意
    UNAPPROVED: 0,
    //待支付
    UNPAID: 1,
    //待确认
    UNCONFIRMED: 2,
    //待评价
    UNRATED: 3,
    //5	已完成
    COMPLETED: 4,
    //6	已取消
    CANCELED: 5,
    //已拒绝
    REFUSED: 6
}
export default orderStatus