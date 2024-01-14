const logger = {
  error: (message: string) => console.error(`[ERROR] ${message}`),
  info: (message: string) => console.log(`[INFO] ${message}`),
  log: (object: {}) => console.log(object),
  debug: (message: string) => console.log(`[DEBUG] ${message}`),
}

export default logger
