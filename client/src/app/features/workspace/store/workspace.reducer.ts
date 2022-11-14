import {Board} from "../../../shared/models/board.model";
import * as WorkspaceActions from './workspace.actions'


export interface State {
  boards: Board[];
  activeBoard: Board;
}
const initialState: State = {
  boards: [],
  activeBoard: null
}

export function workspaceReducer(state = initialState, action: WorkspaceActions.WorkspaceActions){

  switch (action.type){
    case WorkspaceActions.SET_BOARDS:
      return {
        ...state,
        boards: [...action.payload]
      }
    case WorkspaceActions.ADD_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards,
          action.payload
        ]
      }
      case WorkspaceActions.EDIT_BOARD:
      const boardIndex = state.boards.findIndex(board => board._id === action.payload.id)
      const updatedBoard = {
        ...state.boards[boardIndex],
        ...action.payload.updatedBoard
      }
      const updatedBoards = [...state.boards]
      updatedBoards[boardIndex] = updatedBoard;

      return {
        ...state,
        boards: updatedBoards
      }
    case WorkspaceActions.DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => {
          return board._id !== action.payload
        })
      }

    case WorkspaceActions.SET_ACTIVE_BOARD:
      return {
        ...state,
        activeBoard: action.payload
      }

    case WorkspaceActions.CLEAR_ACTIVE_BOARD:
      return {
        ...state,
        activeBoard: null
      }

    default:
      return state
  }

}
