import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';
// import { LoggingMiddleware } from './common/middlewares/logger.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MovieModule,
    TaskModule,
    ReviewModule,
    ActorModule,
  ],
})
export class AppModule {}
//
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer.apply(LoggingMiddleware).forRoutes(AppController);
//     // consumer.apply(LoggingMiddleware).exclude()
//   }
// }
