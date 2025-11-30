import { Router } from "express";
import authModule from "./auth";
import adminModule from "./admin";

export interface ModuleDefinition {
  name: string;
  basePath: string;
  router: Router;
}

const modules: ModuleDefinition[] = [authModule, adminModule];

export default modules;
