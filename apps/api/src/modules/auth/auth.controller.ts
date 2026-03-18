import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'
import { TokenResponseDto } from './dto/token-response.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from '../../common/decorators/public.decorator'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '@/generated/prisma/client'

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    @ApiOperation({ summary: 'Create a new account' })
    async signup(@Body() dto: SignupDto): Promise<UserResponseDto> {
        const user = await this.authService.signup(dto)
        return UserResponseDto.fromEntity(user)
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiBody({ type: LoginDto })
    async login(@CurrentUser() user: User): Promise<TokenResponseDto> {
        return this.authService.generateToken(user)
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Verify current token' })
    async verify(@CurrentUser() user: User) {
        return { valid: true, email: user.email }
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    async me(@CurrentUser() user: User): Promise<UserResponseDto> {
        return UserResponseDto.fromEntity(user)
    }
}
