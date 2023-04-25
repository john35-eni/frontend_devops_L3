import { useEffect, useState } from "react";

// eslint-disable-next-line consistent-return
export default function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });

  useEffect(() => {
    (async function () {
      const response = await fetch(url);
      const responseData = await response.json();
      if (response.ok) {
        setState({
          items: responseData,
          loading: false,
        });
      } else {
        alert(JSON.stringify(responseData));
        setState((s) => ({ ...s, loading: false }));
      }
    })();
  }, []);

  return [state.loading, state.items];
}
