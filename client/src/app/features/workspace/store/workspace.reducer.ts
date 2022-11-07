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
      console.log(action.payload)
      return {
        ...state,
        boards: [...action.payload]
      }
    case WorkspaceActions.ADD_BOARD:
      console.log(action.payload)
      return {
        ...state,
        boards: [
          ...state.boards,
          action.payload
        ]
      }
    // case WorkspaceActions.EDIT_BOARD:
    //   const updBoardIndex = state.boards.findIndex(board => board._id === action.payload.id)
    //   const updBoard = state.boards.find(board => board._id === action.payload.id)
    //   console.log(updBoardIndex)
    //   const updatedBoards = [...state.boards]
    //   updatedBoards[updBoardIndex] = updBoard;
    //
    //   return {
    //     ...state,
    //     boards: updatedBoards
    //   }

      // const listIndex = state.lists.findIndex(list => list._id === action.payload.id);
      // const updatedList = {
      //   ...state.lists[listIndex],
      //   ...action.payload.list
      // }
      // const updatedLists = [...state.lists];
      // updatedLists[listIndex] = updatedList;
      // return {
      //   ...state,
      //   lists: updatedLists
      // }
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
