const useFetch = () => {
  const fetchData = async (
    endpoint: String,
    method: string,
    body: Object,
    token: String,
    isExtAPI = false
  ) => {
    const path = isExtAPI ? endpoint : import.meta.env.VITE_SERVER + endpoint;

    const res = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    const data: {
      status: String;
      errors: String;
      message: String;
      msg: String;
    } = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
      } else {
        returnValue = { ok: true, data };
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
      }
    }

    return returnValue;
  };

  return fetchData;
};

export default useFetch;