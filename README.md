Requimientos:
1. n8n
2. Applicacion de Dropbox (con Refresh token, CLient ID, Client Token)
3. MySQL
4. Node.js
5. API de Google Gemini

Instruccion de n8n:
1. Importe un workflow a n8n
2. Configurar Dropbox en n8n (Método recomendado: OAuth2 manual con Refresh Token)
  1. Crea una app en Dropbox
  2. Ir a: https://www.dropbox.com/developers/apps
  3. Crear una app → tipo Scoped Access
  4. Tipo: Full Dropbox
  5. Activar scopes:
     - files.content.read
     - files.content.write
     - files.metadata.read
  6. Obtenga App Key (client_id) y App Secret (client_secret)

  7. Obtener el Refresh Token de Dropbox
     Dropbox ya no da permanent tokens, así que necesitas un refresh token.
     Abre esta URL reemplazando TU_CLIENT_ID:

    https://www.dropbox.com/oauth2/authorize?client_id=TU_CLIENT_ID&token_access_type=offline&response_type=code&redirect_uri=https://localhost
