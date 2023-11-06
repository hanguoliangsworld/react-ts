import { message } from "antd";
import { LOCAL_STORAGE } from "@/config";
// 全屏浏览器
export function fullscreen() {
  try {
    const docElm = document.documentElement as any;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } catch {
    message.warning("您所使用的浏览器不支持全屏");
  }
}

// 退出全屏浏览器
export function exitFullscreen() {
  try {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  } catch {
    message.warning("您所使用的浏览器不支持退出全屏, 请按ESC");
  }
}

// 注销登录
export function logout() {
  setTimeout(() => {
    const localStorageWhiteList = [LOCAL_STORAGE.LOGIN_NAME];
    const localStorageLen = localStorage.length;
    const allLocalStorageKey: string[] = [];

    for (let i = 0; i < localStorageLen; i++) {
      const key = localStorage.key(i) as string;
      allLocalStorageKey.push(key);
    }

    allLocalStorageKey.forEach((keyName) => {
      if (localStorageWhiteList.indexOf(keyName) === -1) {
        localStorage.removeItem(keyName);
      }
    });
    sessionStorage.clear();
    window.location.reload();
  });
}

export const shortTimeEnergy = (audioData: any) => {
  let sum = 0;
  const energy = [];
  const { length } = audioData;
  for (let i = 0; i < length; i++) {
    sum += audioData[i] ** 2;

    if ((i + 1) % 256 === 0) {
      energy.push(sum);
      sum = 0;
    } else if (i === length - 1) {
      energy.push(sum);
    }
  }
  return energy;
};
