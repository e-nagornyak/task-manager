import { instance } from 'api/instance'
import { LoginParamsType, ResponseType } from 'api/types'

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
  }
}
