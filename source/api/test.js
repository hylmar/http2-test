export async function handler() {
  const response = {
    foo: "bar",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}
