
import { computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import { colorHex } from '@/libs/utils/function';
export let getProjectSize = () => {
    const store = useStore();

    return computed(() => store.state.themeConfig.size);
};
export let setTheme = async (value: any) => {
    await nextTick();
    for (let i in value) {
        document.documentElement.style.setProperty(`--el-color-${i}`, value[i]);
        document.documentElement.style.setProperty(`--bg-${i}`, value[i]);
        for (let j = 1; j <= 9; j++) {
            document.documentElement.style.setProperty(
                `--el-color-${i}-light-${j}`,
                `rgba(${colorHex(value[i])},.${9 - j})`
            );
        }
    }
};