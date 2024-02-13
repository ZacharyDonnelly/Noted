const getURLParams = (paramName: string, url: string): string => {
  const { searchParams }: URL = new URL(url);

  return searchParams.get(paramName) as string;
};
export default getURLParams;
