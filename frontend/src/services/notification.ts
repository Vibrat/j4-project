import { RootState } from '@/lib/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Video } from './video'
import { logout } from '@/features/auth/slice'
import { WS_BASE_URL } from './config'

export type Message = Video

/**
 * Keep-alive websocket which handles explicit closing
 *  in case of implicit closing, there is a need to implement ping / pong mechanism
 */
class KeepAliveWebSocket {
  
  ws!: WebSocket
  url: string
  token!: () => string
  onmessage!: ((event: MessageEvent) => void)
  onclose!: ((event: CloseEvent) => void)

  constructor(url: string) {
    this.url = url
  }
  connect() {
    this.ws = new WebSocket(`${this.url}?token=${this.token()}`)
    this.ws.onmessage = this.onmessage
    this.ws.onclose = this.onclose
    this.ws.onclose = (event: CloseEvent) => {
      this.onclose(event)
      if(this.token()) {
        this.connect()
      }
    }
  }

  set_token(token_getter: () => string) {
    this.token = token_getter
  }

  set_onmessage(onmessage: (event: MessageEvent) => void) {
    this.onmessage = onmessage
  }

  set_onclose(onclose: (event: CloseEvent) => void) {
    this.onclose = onclose
  }
  close() {
    this.ws.close()
  }
}

let MasterSocket: KeepAliveWebSocket = new KeepAliveWebSocket(
  `${WS_BASE_URL}/ws/broadcast`
)

export const notificationAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: WS_BASE_URL,
  }),
  endpoints: (build) => ({
    getMessages: build.query<Message, void>({
      // @ts-ignore
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(
        arg,
        { getState, updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {  
        // create a websocket connection when the cache subscription starts
        MasterSocket.set_token(() => {
          const state = getState() as RootState
          return state.auth.token ?? ""
        })
        MasterSocket.set_onmessage((event: MessageEvent) => {
          const data: Video = JSON.parse(event.data)
          updateCachedData(() => {
            return data
          })
        })
        MasterSocket.set_onclose((event) => {
          if (event.code == 403) {
            dispatch(logout())
          }
        })
        MasterSocket.connect()
      
        try {
          await cacheDataLoaded
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        MasterSocket.close()
      },
    }),
  }),
})

export const { useGetMessagesQuery, useLazyGetMessagesQuery } = notificationAPI
export default MasterSocket