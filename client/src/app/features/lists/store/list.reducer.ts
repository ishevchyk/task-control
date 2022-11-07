import {List} from "../../../shared/models/list.model";
import * as ListActions from "./list.actions";

export interface State {
  lists: List[]
}

const initialState: State = {
  lists: []
}

export function listReducer (state: State = initialState, action: ListActions.ListActions ) {
  switch (action.type) {
    case ListActions.SET_LISTS:
      return {
        ...state,
        lists: action.payload
      }
    case ListActions.CLEAR_LISTS:
      return {
        ...state,
        lists: []
      }
    case ListActions.ADD_LIST:
      return {
        ...state,
        lists: [
          ...state.lists,
          action.payload
        ]
      }
    case ListActions.EDIT_LIST:
      const listIndex = state.lists.findIndex(list => list._id === action.payload.id);
      const updatedList = {
        ...state.lists[listIndex],
        ...action.payload.list
      }
      const updatedLists = [...state.lists];
      updatedLists[listIndex] = updatedList;
      return {
        ...state,
        lists: updatedLists
      }

    case ListActions.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => {
          return list._id !== action.payload
        })
      }

    case ListActions.ADD_TASK:
      const list = state.lists.find(list => list._id === action.payload.listId)

      const tasks = [...list.tasks]
      tasks.push(action.payload)
      const updList = {
        ...list,
        tasks: tasks
      }
      const ind = state.lists.findIndex(list => list._id === action.payload.listId)
      const ulists = [...state.lists]
      ulists[ind] = updList

      return {
        ...state,
        lists: ulists
      }

    case ListActions.DELETE_TASK:
      const list2 = state.lists.find(list => list._id === action.payload.listId)
      const task = list2.tasks.find(task => task['_id'] === action.payload.taskId)
      let tasks2 = [...list2.tasks]
      tasks2 = [...tasks2.filter(taskI => taskI['_id'] !== task['_id'])]
      // const list = state.lists.find(list => list._id ===)
      const updList2 = {
        ...list2,
        tasks: tasks2
      }
      const ind2 = state.lists.findIndex(list => list._id === action.payload.listId)
      const ulists2 = [...state.lists]
      ulists2[ind2] = updList2
      return {
        ...state,
        lists: ulists2
      }

    default:
      return {
        ...state
      }
  }
}
