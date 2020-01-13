import { HttpException, HttpStatus } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { UserLogin } from 'src/users/dto/user-login.dto'
import { AuthService } from './auth.service'
import { UserShow } from 'src/users/dto/user-show.dto'
import { UserInput } from 'src/users/dto/user-input.dto'
import { Token } from './interfaces/token.interface'
import { TokenDto } from './dto/token.dto'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenDto)
  async login(@Args('input') input: UserLogin): Promise<Token> {
    const user = await this.authService.validateUser(input)

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

    return this.authService.login(user)
  }

  @Mutation(() => UserShow)
  async signUp(@Args('input') input: UserInput): Promise<UserShow> {
    const user = await this.authService.signUp(input)

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

    return user
  }
}