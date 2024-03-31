export const checkEnv = () => {
  const envVariables = ['SERVER_PORT', 'DATABASE_URL']

  for (const envVar of envVariables) {
    if (!process.env[envVar]) {
      console.error(`Missing environment variable: ${envVar}`)
      process.exit(1)
    }
  }
}
