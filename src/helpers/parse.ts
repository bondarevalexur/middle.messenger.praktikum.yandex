async function parseResp(response: any) {
  try {
    const data = await JSON.parse(response);
    return data;
  } catch (e) {}
}

export default parseResp;
