import Showdown from "showdown";
import Textgears from "textgears-api";
const textgearsApi = Textgears(process.env.TEXT_GEARS_API_KEY);

export async function checkGrammer(text: string) {
  const result = await textgearsApi.checkGrammar(text);
  const errors = result.response.errors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return errors.map((error: any) => {
    delete error.id;
    return error;
  });
}

export async function convertToHtml(text: string) {
  const converter = new Showdown.Converter();
  return converter.makeHtml(text);
}
