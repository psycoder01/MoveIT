/* eslint-disable @typescript-eslint/only-throw-error */

import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class HttpService {
  constructor() {}

  async post<TRes, TBody extends BodyInit | null>(
    url: string,
    body: TBody,
    config?: RequestInit,
  ): Promise<TRes> {
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
        ...config,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const resp = await response.text();
      if (!resp) return null as TRes;

      return JSON.parse(resp) as TRes;
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "External request failed";
      throw new HttpException(errMsg, HttpStatus.BAD_GATEWAY);
    }
  }

  async get<TRes>(url: string, config?: RequestInit): Promise<TRes> {
    try {
      const response = await fetch(url, { ...config });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const resp: unknown = await response.json();
      return resp as TRes;
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "External request failed";
      throw new HttpException(errMsg, HttpStatus.BAD_GATEWAY);
    }
  }
}
