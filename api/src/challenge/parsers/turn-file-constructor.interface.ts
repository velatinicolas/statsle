// This strange interface only exists in order to allow the dynamic "new"
// when providing the turn files in the `provideTurnFiles` helper
export interface TurnFileConstructorInterface<T> {
  new (): T;
}
