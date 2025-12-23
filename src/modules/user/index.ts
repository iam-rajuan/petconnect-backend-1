import { Router } from "express";
import authModule from "./auth";
import usersModule from "./users";
import petsModule from "./pets";
import uploadsModule from "./uploads";
import adoptionModule from "./adoption";
import providersModule from "./providers";
import appointmentsModule from "./appointments";

export interface UserModuleDefinition {
  name: string;
  basePath: string;
  router: Router;
}

const userModules: UserModuleDefinition[] = [
  authModule,
  usersModule,
  petsModule,
  uploadsModule,
  adoptionModule,
  providersModule,
  appointmentsModule,
];

export default userModules;
