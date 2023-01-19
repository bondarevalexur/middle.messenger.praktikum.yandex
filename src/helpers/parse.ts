async function parseResp(response: string) {
  try {
    const data = await JSON.parse(response);
    return data;
  } catch (e) {}
}

export default parseResp;
