import { Cupon } from '../Entities/Cupon';

export abstract class ICuponRepository {
  abstract GetCuponById(cuponId: string): Promise<Cupon | null>;
  abstract Create(entity: Cupon): Promise<Cupon | null>;
  abstract Update(entity: Cupon): Promise<Cupon | null>;
  abstract Delete(id: string): Promise<Cupon | null>;
}
