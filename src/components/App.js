// コンポーネントなどをまとめる

import React, { useRef } from "react";

// useTodo()カスタムフック
// 状態変数やTODOのトグル、追加、削除などの機能が入っている
import { useTodo } from "../hooks/useTodo";

// TodoTitle, TodoAdd, TodoList コンポーネントを import 
// それぞれタイトルやフォーム、表示するリスト
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

function App() {

 const {
    todoList, // TODO の現在の状態
    addTodoListItem, // 新規のTODOを追加する関数
    toggleTodoListItemStatus, // done(完了/未完了)を反転させて更新する関数
    deleteTodoListItem // TODOを削除する関数
  } = useTodo();

  // useRef で refオブジェクトを作成（TODO入力フォームで利用）
  const inputEl = useRef(null);

  // TODO入力フォームで入力された文字列を新しいTODOに登録するための
  // handleAddTodoListItem関数の宣言
  const handleAddTodoListItem = () => {

    // 何も入力されていない場合はクリックしても何も返さない
    if (inputEl.current.value === "") return;

    // テキストエリアに乳旅行されたテキストを新規TODOとして追加
    // 追加したらテキストエリアを空の文字列にする
    // 「+ TODOを追加」ボタンクリックで addTodoListItem関数を実行
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  // console.log でコンソールに取得したTODOリストの情報を表示してみる
  console.log("TODOリスト:", todoList);

  // filter() を利用して「TODOの状態が未完了」の要素を持つ新しい配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  // filter() を利用して「TODOの状態が完了」の要素を持つ新しい配列を作成
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return (
    <>
      <TodoTitle title="TODO進捗管理" as="h1" />

      <TodoAdd inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} />

      <TodoTitle title="未完了TODOリスト" as="h2" />

      <TodoList todoList={inCompletedList} 
      
      //useTodo()カスタムフックの toggleTodoListItemStatus関数を props で渡す
      // この関数は todoListItem のdoneを反転して更新する
      toggleTodoListItemStatus={toggleTodoListItemStatus}

      //useTodo()カスタムフックの deleteTodoListItem関数を props で渡す
      // この関数は各TODOの削除ボタンクリックで実行され、TODOを削除する
      deleteTodoListItem={deleteTodoListItem}
      />

      {/* h2見出しタグを todoTitle コンポーネントに */}
      {/* 見出しに表示させたいテキストを title に代入して子コンポーネントへ props で渡す */}
      {/* h2 を as に代入して子コンポーネントへ props で渡す */}
      <TodoTitle title="完了TODOリスト" as="h2" />

      {/* TodoList コンポーネント */}
      {/* 完了TODOリスト completedList を todoList へ代入して子コンポーネントへ props で渡す */}
      <TodoList todoList={completedList} 
      // TODOの状態反転関数をpropsで引き渡す
      toggleTodoListItemStatus={toggleTodoListItemStatus} 
      // 各種TODOを削除する関数を props で渡す
      deleteTodoListItem={deleteTodoListItem} />
    </> 
  );
}

export default App;