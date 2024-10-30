import { questions } from "./endpoints/questions";

const urlMaps = {
  questions: questions,
};

const generateHeaders = (
  method: string,
  reqData?: Record<string, unknown>
): RequestInit => {
  const apiHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const params: RequestInit = {
    method,
    headers: apiHeaders,
    body: reqData ? JSON.stringify(reqData) : undefined,
  };

  return params;
};

interface FetchFuncParams {
  fetchType: keyof typeof urlMaps;
  fetchName: string;
  reqData?: Record<string, unknown>;
  id?: string;
}

export const Fetcher = async ({
  fetchType,
  fetchName,
  reqData,
  id,
}: FetchFuncParams): Promise<unknown | number | string> => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const selected = urlMaps[fetchType]?.find((item) => item.name === fetchName);

  if (!selected)
    throw new Error(`Endpoint not found for fetchName: ${fetchName}`);

  // URL oluşturma
  const constructedUrl = `${url}${selected.url}${id ? `/${id}` : ""}`;

  try {
    const response = await fetch(
      constructedUrl,
      generateHeaders(selected.method, reqData)
    );

    if (response.ok) {
      return await response.json();
    } else {
      return response.status;
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message === "Failed to fetch" ? 500 : "error";
    }
    
    return "error";
  }
};
