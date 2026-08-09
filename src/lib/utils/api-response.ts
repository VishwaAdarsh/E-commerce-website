import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export function apiSuccess<T>(data: T, status: number = 200) {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(payload, { status });
}

export function apiError(code: string, message: string, status: number = 400) {
  const payload: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };
  return NextResponse.json(payload, { status });
}
