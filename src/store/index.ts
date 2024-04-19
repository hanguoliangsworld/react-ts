import create from "zustand";

// define the store
const useStore = create((set) => ({
  count: 0,
  name: "小钻风项目管理平台",
  changeName: (val: string) => set((state: any) => ({ name: val })),
}));

export default useStore;
