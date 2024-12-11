import { Inject, Injectable } from '@nestjs/common';
import { ISendEmailBrevo } from './Interface/ISendEmailBrevo';
import { InfoErrors } from 'src/Shoope.Domain/InfoErrors/InfoErrors';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/Shoope.Domain/Entities/User';
// import Brevo from '@getbrevo/brevo';
import * as Brevo from '@getbrevo/brevo';

@Injectable()
export class SendEmailBrevo implements ISendEmailBrevo {
  private readonly apiInstance: Brevo.TransactionalEmailsApi;

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('BREVO_API_KEY');

    if (!Brevo || !Brevo.TransactionalEmailsApi) {
      throw new Error(
        'TransactionalEmailsApi não está definida. Verifique a instalação e importação da biblioteca Brevo.',
      );
    }

    // const apiInstanceContructor = new Brevo.TransactionalEmailsApi();

    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    // this.apiInstance = apiInstanceContructor;
  }

  async SendCode(user: User, code: number): Promise<InfoErrors<string>> {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'SEU NUMERO ALEATORIO DE CONFIRMAÇÃO';
    sendSmtpEmail.htmlContent = `<html><body><h1>Seu numero de Confirmação: ${code}</h1></body></html>`;
    sendSmtpEmail.sender = { name: 'augusto', email: 'augustocesarsantana53@gmail.com' };
    sendSmtpEmail.to = [{ email: user.email, name: user.name }];

    // const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);

    // this.apiInstance.sendTransacEmail(sendSmtpEmail).then(
    //   function () {
    //     return InfoErrors.ok('E-mail enviado com sucesso');
    //   },
    //   function () {
    //     return InfoErrors.fail('Erro ao enviar o e-mail');
    //   },
    // );

    // this.apiInstance.sendTransacEmail(sendSmtpEmail);

    const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);

    if (!response.body.messageId) {
      return InfoErrors.fail('Erro ao enviar o e-mail');
    }

    return InfoErrors.ok('E-mail enviado com sucesso');
  }
}
