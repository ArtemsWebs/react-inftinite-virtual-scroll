export function isAsync(func) {
  return func.constructor.name === 'AsyncFunction';
}
