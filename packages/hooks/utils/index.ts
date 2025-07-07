export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}
