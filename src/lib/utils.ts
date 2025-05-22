export const useLocalStorage = (key: string) => {
    return {
        setLocalStorage: (value: string) => {
            localStorage.setItem(key, value);
        },
        getLocalStorage: () => {
            const data = localStorage.getItem(key);
            if (data) {
                return JSON.parse(data)
            }
            return null;
        },
        removeLocalStorage: () => {
            localStorage.removeItem(key);
        }
    }
}