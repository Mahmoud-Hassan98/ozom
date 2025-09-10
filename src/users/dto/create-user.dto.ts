import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'Username of the user' })
  username: string;
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  email: string;
  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  password: string;
}
