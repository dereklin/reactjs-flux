import d from '../dispatcher';
import * as ACT from '../types';
import ajax from '../../utils/ajax';

export function addTask(packt) {
  ajax({
    url: '/add-task',
    data: packt,
    successHook: (task) => {
      addTaskSync(task);
    }

  });
}

export function addTaskSync(packt) {
  d.dispatch({type: ACT.ADD_TASK, payload: packt})
}

export function initTasks() {
  ajax({
    url: '/all',
    method: 'get',
    successHook: (tasks) => {
      d.dispatch({type: ACT.INIT_TASKS, payload: tasks})
    }

  });
}

export function remove(packt) {
  ajax({
    url: '/remove',
    data: packt,
    successHook: (removed) => {
      removed && d.dispatch({type: ACT.REMOVED, payload: packt})
    }

  });
}