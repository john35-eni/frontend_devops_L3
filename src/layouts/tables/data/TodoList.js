import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import axiosInstance from "services/axios";

// eslint-disable-next-line import/prefer-default-export
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    // eslint-disable-next-line no-use-before-define
    fetchTodo();
    isMounted.current = true;
  }, []);

  const fetchTodo = () => {
    setLoading(true);
    axiosInstance
      .get("/todo/")
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <p>loading....</p>
      ) : (
        <div>
          {todos?.map((todo) => (
            <ul key={todo.todo_id}>
              <li>{todo.couleur}</li>
              <li>{todo.created_at}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
