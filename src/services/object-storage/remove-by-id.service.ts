import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function removeById(id: string): Promise<void> {
  await objectStorageRepo.removeById(id);
};
