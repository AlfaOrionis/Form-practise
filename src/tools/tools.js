export const fetchHandler = async (values) => {
  try {
    const data = await fetch(
      "https://frosty-wood-6558.getsandbox.com:443/dishes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const response = await data.json();

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
