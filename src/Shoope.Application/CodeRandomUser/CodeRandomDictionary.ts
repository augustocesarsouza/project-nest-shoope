export class CodeRandomDictionary {
  private readonly dictionaryCode: Map<string, number>;

  constructor() {
    this.dictionaryCode = new Map<string, number>();
  }

  add(idGuid: string, valueCode: number): void {
    if (!this.dictionaryCode.has(idGuid)) {
      this.dictionaryCode.set(idGuid, valueCode);
    } else {
      this.dictionaryCode.set(idGuid, valueCode);
    }
  }

  contains(idGuid: string, valueCode: number): boolean {
    if (this.dictionaryCode.has(idGuid)) {
      const value = this.dictionaryCode.get(idGuid);
      return value === valueCode;
    }
    return false;
  }

  containsId(idGuid: string): boolean {
    return this.dictionaryCode.has(idGuid);
  }

  remove(idGuid: string): void {
    this.dictionaryCode.delete(idGuid);
  }
}
