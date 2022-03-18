// TODOをリスト化するコンポーネント

// TodoTitle コンポーネントを import
// 表示するタイトルのコンポーネント
import { TodoTitle } from "./TodoTitle";

// TodoItem コンポーネントを import
// TODOのリストをmapして li 要素群を返す
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem, title, as }) => {
  return (
    <>
      {/* todoList の配列の中身が空の配列の場合、見出しもTODOリストも表示しない */}
      {todoList.length !== 0 (
        <>
          <TodoTitle title={title} as={as} />
          <ul>
            {todoList.map((todo) => (
              <TodoItem todo={todo} key={todo.id} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} />
            ))

            }
          </ul>
        </>
      )}
    </>
  );
};