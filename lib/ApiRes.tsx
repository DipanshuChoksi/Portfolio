import { APIResponse } from "@/interfaces/api";

export default function apiResponse(
  message: string,
  status: number,
  successful: boolean,
  data?: any
): APIResponse {
  
  const res: APIResponse = {
    message,
    status,
    successful,
  };
  if (data) res["data"] = data;
  return res;
}
