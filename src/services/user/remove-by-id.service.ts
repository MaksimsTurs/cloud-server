import userRepo from "../../repos/User.repo";

export default async function removeById(id: string): Promise<void> {
  await userRepo.removeById(id);
};
