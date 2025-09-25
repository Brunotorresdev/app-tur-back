import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from 'src/user/user.service';
import { UserValidationService } from 'src/user/helpers/user-validation.helper';

@Module({
  controllers: [AdminController],
  providers: [UserService, UserValidationService ],
})
export class AdminModule {}
