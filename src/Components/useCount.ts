let count = 0;
export const useCount = () => {
    const incrementCount = () => {
        count = count + 1
    }

    const getCount = () => {
        return count;
    }

    return { incrementCount, getCount };
}