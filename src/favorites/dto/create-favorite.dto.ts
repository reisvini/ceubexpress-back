import { IsNotEmpty, IsString } from 'class-validator';
import { Favorite } from '../entities/favorite.entity';

export class CreateFavoriteDto extends Favorite {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
