// 定义一个名为 NumberFormatter 的工具模块
namespace NumberFormatter {
    // 将数字格式化为以 K 或 W 结尾的字符串
    export function formatNumber(num: number): string {
        // 针对小于 1000 的数字，直接返回其字符串表示形式。
        if (num < 1000) {
            return num.toString();
        }

        // 针对大于或等于 1000 但小于 10000 的数字，格式化为 K 形式。
        if (num >= 1000 && num < 10000) {
            const formattedNumber = (num / 1000).toFixed(1);
            return `${formattedNumber}K`;
        }

        // 针对大于或等于 10000 的数字，格式化为 W 形式。
        if (num >= 10000) {
            const formattedNumber = (num / 10000).toFixed(1);
            return `${formattedNumber}W`;
        }

        // 这里是一个防止意外情况的附加返回值。
        // 在正常情况下，这一行代码不应该被执行。
        return "Invalid input";
    }
}

// 将工具模块导出，使其可以在其他 TypeScript 文件中被引用
export default NumberFormatter;