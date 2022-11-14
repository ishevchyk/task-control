import {List} from "../../../shared/models/list.model";
import * as ListActions from "./list.actions";

export interface State {
  lists: List[],
  activeComments: string[]
}

const initialState: State = {
  lists: [],
  activeComments: []
}

export function listReducer (state: State = initialState, action: ListActions.ListActions ) {
  switch (action.type) {
    case ListActions.SET_ACTIVE_COMMENTS:
      return {
        ...state,
        activeComments: action.payload
      }

    case ListActions.CLEAR_ACTIVE_COMMENTS:
      return {
        ...state,
        activeComments: []
      }
    case ListActions.ADD_COMMENT:
      return {
        ...state,
        activeComments: [
          ...state.activeComments,
          action.payload.comment.comment
        ]

      }
    case ListActions.DELETE_COMMENT:
      return {
        ...state,
        activeComments: state.activeComments.filter((comment, index) => {
          return index !== action.payload.index
        })

      }
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
      let listIndex = state.lists.findIndex(list => list._id === action.payload.id);
      let updatedList = {
        ...state.lists[listIndex],
        ...action.payload.dataToUp
      }
      let updatedLists = [...state.lists];
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
      const listWithUpdatedTasks = {
        ...list,
        tasks: tasks
      }
      const indexOfList = state.lists.findIndex(list => list._id === action.payload.listId)
      let listsAfter = [...state.lists]
      listsAfter[indexOfList] = listWithUpdatedTasks

      return {
        ...state,
        lists: listsAfter
      }

    case ListActions.EDIT_TASK:
      let listInEdit = state.lists.find(list => list._id === action.payload.task.listId)
      const listInEditIndex = state.lists.findIndex(list => list._id === action.payload.task.listId);
      let tasksInEdit = [...listInEdit.tasks];
      const taskIndex = listInEdit.tasks.findIndex(task => task['_id'] === action.payload.task._id)
      const updatedTask = {
        ...tasksInEdit[taskIndex],
        ...action.payload.dataToUp
      }
      tasksInEdit[taskIndex] = updatedTask;
      listInEdit = {
        ...listInEdit,
        tasks: tasksInEdit
      }
      let allLists = [...state.lists]
      allLists[listInEditIndex] = listInEdit

      return {
        ...state,
        lists: allLists
      }

    case ListActions.DELETE_TASK:
      const listToUpdate = state.lists.find(list => list._id === action.payload.listId)
      const task = listToUpdate.tasks.find(task => task['_id'] === action.payload.taskId)
      let tasksToLeave = [...listToUpdate.tasks]
      tasksToLeave = [...tasksToLeave.filter(taskI => taskI['_id'] !== task['_id'])]
      const listAfter = {
        ...listToUpdate,
        tasks: tasksToLeave
      }
      const listInd = state.lists.findIndex(list => list._id === action.payload.listId)
      const listsAfterUpdate = [...state.lists]
      listsAfterUpdate[listInd] = listAfter
      return {
        ...state,
        lists: listsAfterUpdate
      }

    default:
      return {
        ...state
      }
  }
}
