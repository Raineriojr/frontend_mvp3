import Cookie from 'js-cookie';

export const setCookie = (name: string, data: { token: string }) => {
  Cookie.set(name, data.token, {
    expires: 1000 * 60 * 30
  })
}

export const removeCookie = (name: string) => {
  Cookie.remove(name)
}