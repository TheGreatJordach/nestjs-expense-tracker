import { AuthType } from "./auth-type.enum";
import { SetMetadata } from "@nestjs/common";

export const AUTH_TYPE_KEY = "AuthType";
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
