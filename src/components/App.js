// コンポーネントなどをまとめる

import React, { useState, useEffect } from "react";


import axios from "axios";

// モックサーバーとの通信のため axios を import
const todoDataUrl = "http://localhost:3100/todos";

// TodoTitle コンポーネントを作成
// 見出しタグがh1, h2の場合の条件分岐を作成しておく
// 親コンポーネントから title, as を props として受け取る
const TodoTitle = ({ title, as }) => {

  // as が h1 ならばタイトルタグは h1
  if (as === "h1") return <h1>{title}</h1>;

  // as が h2 ならばタイトルタグは h2
  if (as === "h2") return <h2>{title}</h2>;

  // どちらでも泣ければタグは p
  return <p>{title}</p>;
};

// TodoItem コンポ―ネントを作成
// 親コンポーネントから todo を props として受け取る
const TodoItem = ({ todo }) => {
  return (
    <li>

      {/* TODOの内容 */}
      {todo.content}

      {/* TODOが完了の場合は「未完了リストへ」、未完了の場合は「完了リストへ」と表示するボタンを設置 */}
      {/* 現時点でトグルボタンは機能していない */}
      <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>

      {/* TODOの「削除」ボタンを設置 */}
      {/* 現時点で「削除」ボタンは機能していない */}
      <button>削除</button>
    </li>
  );
};

// TodoList コンポーネントを作成
// 親コンポーネントから todoList を props として受け取る
const TodoList = ({ todoList }) => {
  return (
    <ul>

      {/* map() を利用して todoList の内容をひとつひとつ取り出す */}
      {todoList.map((todo) => (

        // TodoItem に一意なIDを key属性の値として付与
        // todoList から取り出した todo を子コンポーネントへ propsで渡す
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

function App() {

  // todoList は現在のTODOの状態
  // setTodoList は現在の todoList の状態を更新するための関数
  // todoList の初期値には空の配列
  const [todoList, setTodoList] = useState([]);

  // useEffect() を利用することでコンポーネントのマウント後に処理を実行
  // async/await で非同期処理化
  useEffect(() => {
    const fetchData = async () => {

      // get は外部から情報を取得する基本メソッド
      // get の引数にURLを入れるとURLに対してGETリクエストを送信
      // リクエスト後に戻ってくる値はすべてresponse に保存される
      const response = await axios.get(todoDataUrl);

      // 戻された値について useState を利用して
      // todoList の現在の値としてセットする
      setTodoList(response.data);
    };
    fetchData();
  },[]);

  // console.log でコンソールに取得したTODOリストの情報を表示してみる
  console.log("TODOリスト:", todoList);

  // filter() を利用して「TODOの状態が未完了」の要素を持つ新しい配列を作成
  const inCompletedList = todoList((todo) => {
    return !todo.done;
  });

  // filter() を利用して「TODOの状態が完了」の要素を持つ新しい配列を作成
  const completedList = todoList((todo) => {
    return todo.done;
  });

  return (
    <>

      {/* h1見出しタグを　TodoTitle コンポーネントに */}
      {/* 見出しに表示させたいテキストを title に代入して子コンポーネントへ props で渡す */}
      <TodoTitle title="TODO進捗管理" as="h1" />

      {/*現時点で textarea は機能していない */}
      <textarea />

      {/* 現時点で「+ TODOを追加」ボタンは機能していない */}
      <button>+ TODOを追加</button>

      {/* h2見出しタグを TodoTitle コンポーネントに */}
      {/* 見出しに表示させたいテキストを title に代入して子コンポーネントへ props で渡す */}
      <TodoTitle title="未完了TODOリスト" as="h2" />

      {/* TodoList コンポーネント */}
      {/* 未完了TODOリスト inCompletedList を todoList に代入して子コンポーネントへ props で渡す */}
      <TodoList todoList={inCompletedList} />

      {/* h2見出しタグを todoTitle コンポーネントに */}
      {/* 見出しに表示させたいテキストを title に代入して子コンポーネントへ props で渡す */}
      {/* h2 を as に代入して子コンポーネントへ props で渡す */}
      <TodoTitle title="完了TODOリスト" as="h2" />

      {/* TodoList コンポーネント */}
      {/* 完了TODOリスト completedList を todoList へ代入して子コンポーネントへ props で渡す */}
      <TodoList todoList={completedList} />

    </> 
  );
}

export default App;