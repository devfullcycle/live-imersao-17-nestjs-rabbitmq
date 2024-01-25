import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutsModule } from './checkouts/checkouts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Checkout,
  CheckoutItem,
  CheckoutProduct,
} from './checkouts/entities/checkout.entity';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { PaymentsModule } from './payments/payments.module';

//decorator - ES7
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [Checkout, CheckoutItem, CheckoutProduct], //regex
      synchronize: true,
      logging: true,
    }),
    CheckoutsModule,
    RabbitmqModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //modulo raiz
//kebab-case
