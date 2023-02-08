
const PROD=false
export const CONFIG = {
  // 路由 basename
  baseURL: '/',
  // 网页标题
  title: '小钻风',
  github: {
    clientId: PROD ? '789d87c19dd5ed1dc42e' : '489b39e1f91d934128c8',
    // callbackURL 不可随意更改, 否则需要与服务端配置文件一同修改
    callbackURL: `${PROD ? 'https://work-api.xiejiahe.com' : window.location.origin}/api/passport/github/callback`,

    // 可忽略，只是用于页面展示
    repositoryUrl: 'https://github.com/xjh22222228/tomato-work',
    bug: 'https://github.com/xjh22222228/tomato-work/issues'
  }
}

