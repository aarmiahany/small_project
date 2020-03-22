import React from 'react'
import TodoList from './TodosComp/TodoList'

export default function Todo(props) {
  return (
    <div>
      <TodoList {...props} />
    </div>
  )
}
