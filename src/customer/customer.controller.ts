import {Body,Controller,Delete,Get,Param,Query,UsePipes,ValidationPipe,Post,UseInterceptors,} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { NameOnlyAlphabetsPipe } from './pipes/name-only-alphabets.pipe';
import { UsernameAlphanumericPipe } from './pipes/username-alphanumeric.pipe';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // OPTIONAL: List all users
  @Get()
  getAll() {
    return this.customerService.getAllUsers();
  }

  // CREATE USER - supports multipart/form-data (form-data tab)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() body: CreateCustomerDto,
    @Body('username', UsernameAlphanumericPipe) username: string,
    @Body('fullName', NameOnlyAlphabetsPipe) fullName: string,
  ) {
    
    const rawIsActive = body?.isActive?.toString().toLowerCase()??'false';
    const isActive =
      rawIsActive === 'true' ||
      rawIsActive === '1' ||
      rawIsActive === 'on';

    return this.customerService.createUser({
      username,
      fullName,
      isActive,
    });
  }

  // Search users by substring
  @Get('search')
  searchByFullName(@Query('fullName') fullNameSubstring: string) {
    return this.customerService.findByFullNameSubstring(fullNameSubstring);
  }

  // Get by username
  @Get('username/:username')
  getByUsername(
    @Param('username', UsernameAlphanumericPipe) username: string,
  ) {
    return this.customerService.findOneByUsername(username);
  }

  // Delete by username
  @Delete('username/:username')
  deleteByUsername(
    @Param('username', UsernameAlphanumericPipe) username: string,
  ) {
    return this.customerService.removeByUsername(username);
  }
}
