import { FlashSaleProductAllInfo } from '../Entities/FlashSaleProductAllInfo';

export abstract class IFlashSaleProductAllInfoRepository {
  abstract GetFlashSaleProductAllInfoById(
    productsOfferFlashId: string,
  ): Promise<FlashSaleProductAllInfo | null>;
  abstract GetFlashSaleProductByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<FlashSaleProductAllInfo | null>;
  abstract Create(entity: FlashSaleProductAllInfo): Promise<FlashSaleProductAllInfo | null>;
  abstract Update(entity: FlashSaleProductAllInfo): Promise<FlashSaleProductAllInfo | null>;
  abstract Delete(id: string): Promise<FlashSaleProductAllInfo | null>;
}
