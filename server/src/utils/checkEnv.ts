export const checkEnv = () => {
  const envVariables = ['SERVER_PORT', 'DATABASE_URL']
  const missingEnvVariables = []

  for (const envVar of envVariables) {
    if (!process.env[envVar]) {
      missingEnvVariables.push(envVar)
    }
  }

  if (missingEnvVariables.length > 0) {
    console.error(
      `Missing environment variables: ${missingEnvVariables.join(', ')}`
    )
    process.exit(1)
  }
}
