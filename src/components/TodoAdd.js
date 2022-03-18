//TODOを新規追加するコンポーネント

export const TodoAdd = ({buttonText, inputEl, handleAddTodoListItem}) => {
  return (
    <>
      <textarea ref={inputEl} />
      {/* 入力フォームにテキストを入力し、ボタンクリックで新規TODOを追加 */}
      <button onClick={handleAddTodoListItem}>{buttonText}</button>
    </>
  );
};