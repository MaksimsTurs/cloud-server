import type { StorageObject } from "../../index.type";
import type { UserLogUpReqBody } from "../..//routes/user/user-route.type.ts";
import type { UserServiceCreateReturn, UserServiceLogUpReturn } from "../../services/user/user-service.type";

import fsAsync from "node:fs/promises";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/object-storage/object-storage.service.ts"

import app from "../../Application.ts";

import SagaPattern from "../../utils/Saga-Pattern/Saga-Pattern.util.ts";

import STORAGE_OBJECT_TYPES from "../../const/STORAGE_OBJECT_TYPES.const.ts";

export default async function logUp(body: UserLogUpReqBody): Promise<UserServiceLogUpReturn> {
  const { conf } = app.context;
  const saga: SagaPattern = new SagaPattern({ stepRetryCount: 1, compensateRetryCount: 2 });
  const data: UserServiceCreateReturn = await userService.create(body);
  const root: StorageObject = objectStorageService.create({
    user_id: data.user.id,
    name: "root",
    type: STORAGE_OBJECT_TYPES.DIR,
    is_root: true
  });

  await userService.sendConfirmEmail(body.email, data.user);
  (await saga
    .add(
      async (): Promise<void> => {
        await userService.save(data);
      },
      async (): Promise<void> => {
        await userService.removeById(data.user.id)
        await fsAsync.rm(`${conf.BASE_STORAGE_PATH}/${data.user.id}`, { recursive: true, force: true });
      }
    )
    .add(
      async (): Promise<void> => {
        await objectStorageService.save(root);
      },
      async (): Promise<void> => {
        await objectStorageService.removeById(root.id);
      }
    )
    .execute())
    .throw();

  return { user: data.user, tokens: data.tokens, root };
};
