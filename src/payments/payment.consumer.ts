import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentConsumer {
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'checkout.created',
    queue: 'microservico-pagamentos',
  })
  async consume(msg: { checkout_id: number; total: number }) {
    try {
      console.log(msg);
      //regra de negocio que está sendo executado
      throw new Error('Erro ao processar pagamento');
    } catch (err) {
      return new Nack(true);
    }
  }
  //Ack mode:
  //  ACK (descartar a msg)
  //  Nack (descarte a msg ou enfileire novamente)

  //2 tipos de erros
  // Erros recuperaveis - mastercad, visa está fora, meu banco de dados está fora
    // limite de reprocessamento - dead letter queue, delayed messages
    // idempotencia -
  // Erros irecuperaveis - mensagem está em formato inválido de JSON, mensagem está com os dados inválidos
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
