Requimientos:
1. n8n
2. Applicacion de Dropbox (con Refresh token, CLient ID, Client Token)
3. MySQL
4. Node.js
5. API de Google Gemini

Instrucción de n8n:
1. Importe un workflow de "Iniciar esto/MatchPro-Workflow.json" a n8n
2. Configure un credencial de Dropbox (Método recomendado: OAuth2 manual con Refresh Token)

   a. Cree una app en Dropbox
   
   b. Ir a: https://www.dropbox.com/developers/apps

   c. Cree una app → tipo Scoped Access

   d. Tipo: App folder

   e. Escriba http://localhost:5678/rest/oauth2-credential/callback para Redirect URIs 

   f. Active scopes:
     - files.content.read
     - files.content.write
     - files.metadata.read
        
   g. Obtenga App Key (CLIENT_ID) y App Secret (CLIENT_SECRET)
    
   h. Video para obtener el Refresh Token de Dropbox: https://www.youtube.com/watch?v=y0tBLoSfjxc

   i. En Dropbox HTTP Request1, escriba unos valores:
     - refresh_token: Refresh Token
     - client_id: App Key
     - client_secret: App Secret
  
4. Configue un credencial del nodo "Google Gemini Chat Model"

   - Host: https://generativelanguage.googleapis.com
   - API Key: 
     - La clave de su proyecto en Google AI Studio: https://aistudio.google.com/app/apikey

Instrucción de MySQL:
1. Importe los datos del archivo SQL de "Iniciar esto/MatchPro-Datos.sql" a MySQL
