import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { AppConfig } from '../../config/app.config'
import { MailService } from './mail.service'

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const appConf = config.get<AppConfig>('app')!
                return {
                    transport: {
                        host: appConf.mailHost,
                        port: appConf.mailPort,
                        secure: false,
                        auth: {
                            user: appConf.mailUser,
                            pass: appConf.mailPassword
                        }
                    },
                    defaults: {
                        from: appConf.mailFrom
                    },
                    template: {
                        dir: join(__dirname, 'templates'),
                        adapter: new HandlebarsAdapter(),
                        options: { strict: true }
                    }
                }
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
