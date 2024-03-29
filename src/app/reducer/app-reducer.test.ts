import { appReducer, AppStateType, setAppError, setAppStatus } from "./app-reducer"

let startState: AppStateType

beforeEach(() => {
  startState = { status: "idle", error: null, isInitialized: false }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppError({ error: "Some error" }))

  expect(endState.error).toBe("Some error")
})

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatus({ status: "loading" }))

  expect(endState.status).toBe("loading")
})
