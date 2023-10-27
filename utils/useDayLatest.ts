import {ref} from 'vue';

export function useIsCreatedToday() {
    const isToday = ref(false);

    const checkIsCreatedToday = (dateString: string) => {
        const createdDate = new Date(dateString);
        const today = new Date();

        // 重置今天的时间部分以便仅比较日期
        today.setHours(0, 0, 0, 0);
        createdDate.setHours(0, 0, 0, 0);

        isToday.value = createdDate.getTime() === today.getTime();
    };

    return { isToday, checkIsCreatedToday };
}