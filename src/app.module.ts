import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';
import { PointsModule } from './points/points.module';
import { StartingPointsModule } from './starting-points/starting-points.module';
import { OperationHoursModule } from './operation-hours/operation-hours.module';

@Module({
  imports: [PrismaModule, UserModule, RoleModule, PermissionModule, RolePermissionModule, AuthModule, PackagesModule, PointsModule, StartingPointsModule, OperationHoursModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
