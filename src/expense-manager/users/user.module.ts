import { Module } from "@nestjs/common";
import { UserManagerService } from "./user.manager.service";

@Module({
  providers: [UserManagerService],
})
export class UserModule {}
